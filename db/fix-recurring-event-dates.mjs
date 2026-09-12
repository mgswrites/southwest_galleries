import { neon } from '@neondatabase/serverless';
import fs from 'fs';

if (!process.env.NEON_DB_KEY) {
  const env = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const sql = neon(process.env.NEON_DB_KEY);

const DOW = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

function todayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function addDays(d, n) {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function fmt(d) {
  return d.toISOString().slice(0, 10);
}

function nextWeekday(from, dow) {
  const diff = (dow - from.getUTCDay() + 7) % 7;
  return addDays(from, diff);
}

function nthWeekdayOfMonth(year, month, dow, n) {
  if (n > 0) {
    const first = new Date(Date.UTC(year, month, 1));
    const firstMatch = nextWeekday(first, dow);
    return addDays(firstMatch, (n - 1) * 7);
  } else {
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const diff = (lastDay.getUTCDay() - dow + 7) % 7;
    return addDays(lastDay, -diff);
  }
}

function parseRule(rule) {
  const out = {};
  for (const part of rule.split(';')) {
    const [k, v] = part.split('=');
    out[k] = v;
  }
  return out;
}

function nextOccurrence(rule, today) {
  const { FREQ, BYDAY, MONTHS } = parseRule(rule);
  const allowedMonths = MONTHS ? MONTHS.split(',').map(Number) : null;

  if (FREQ === 'WEEKLY') {
    const dow = DOW[BYDAY];
    let d = nextWeekday(today, dow);
    if (allowedMonths) {
      let guard = 0;
      while (!allowedMonths.includes(d.getUTCMonth() + 1) && guard < 60) {
        d = addDays(d, 7);
        guard++;
      }
    }
    return d;
  }

  if (FREQ === 'MONTHLY') {
    const n = BYDAY.startsWith('-') ? -1 : parseInt(BYDAY, 10);
    const dow = DOW[BYDAY.slice(n === -1 ? 2 : String(n).length)];
    let year = today.getUTCFullYear();
    let month = today.getUTCMonth();
    for (let i = 0; i < 24; i++) {
      const candidate = nthWeekdayOfMonth(year, month, dow, n);
      if (candidate >= today) return candidate;
      month++;
      if (month > 11) { month = 0; year++; }
    }
    return today;
  }

  return null; // FREQ=YEARLY, 'annual', null, or unrecognized -> handled by caller
}

async function run() {
  const rows = await sql`SELECT id, slug, event_date, event_end_date, recurrence_rule FROM events WHERE is_recurring = true ORDER BY id`;
  const today = todayUTC();

  let updated = 0;
  for (const r of rows) {
    const oldStart = new Date(Date.UTC(r.event_date.getUTCFullYear(), r.event_date.getUTCMonth(), r.event_date.getUTCDate()));
    const oldEnd = r.event_end_date
      ? new Date(Date.UTC(r.event_end_date.getUTCFullYear(), r.event_end_date.getUTCMonth(), r.event_end_date.getUTCDate()))
      : null;
    const spanDays = oldEnd ? Math.round((oldEnd - oldStart) / 86400000) : 0;

    if (oldStart >= today) {
      console.log(`  ok (future): ${r.slug} — ${fmt(oldStart)}`);
      continue;
    }

    let newStart;
    const rule = r.recurrence_rule;
    if (rule && rule.startsWith('FREQ=')) {
      newStart = nextOccurrence(rule, today);
    }
    if (!newStart) {
      newStart = new Date(oldStart);
      while (newStart < today) {
        newStart = new Date(Date.UTC(newStart.getUTCFullYear() + 1, newStart.getUTCMonth(), newStart.getUTCDate()));
      }
    }

    const newEnd = spanDays > 0 ? addDays(newStart, spanDays) : null;

    await sql`
      UPDATE events
      SET event_date = ${fmt(newStart)}, event_end_date = ${newEnd ? fmt(newEnd) : null}
      WHERE id = ${r.id}
    `;
    console.log(`  ✓ ${r.slug}: ${fmt(oldStart)} -> ${fmt(newStart)}${newEnd ? ' .. ' + fmt(newEnd) : ''}`);
    updated++;
  }

  console.log(`\nDone. ${updated} event(s) rolled forward.`);
}

run().catch((e) => { console.error(e); process.exit(1); });

import { c as createComponent } from './astro-component_DO6uffhK.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_D_jqxEgy.mjs';
import { s as sql, c as createListing, u as updateSubmissionStatus, g as getPendingSubmissions, $ as $$Base } from './queries_DBYA1Jl8.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const ADMIN_PASSWORD = "Basquiat12!!";
  const cookieHeader = Astro2.request.headers.get("cookie") ?? "";
  const isAuthed = cookieHeader.includes("admin_authed=1");
  let authError = false;
  let action = "";
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    action = data.get("action") ?? "";
    if (action === "login") {
      const pw = data.get("password");
      if (pw === ADMIN_PASSWORD) {
        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": "admin_authed=1; Path=/admin; HttpOnly; SameSite=Strict",
            "Location": "/admin/"
          }
        });
      } else {
        authError = true;
      }
    } else if (isAuthed) {
      const submissionId = Number(data.get("submission_id"));
      if (action === "approve") {
        const sub = await sql`SELECT * FROM listing_submissions WHERE id = ${submissionId}`;
        if (sub[0]) {
          const s = sub[0];
          const cityRows = await sql`
          SELECT id FROM cities WHERE LOWER(name) = LOWER(${s.city_name}) AND state_code = ${s.state_code} LIMIT 1
        `;
          const cityId = cityRows[0]?.id ?? null;
          const slugBase = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          const existingSlug = await sql`SELECT slug FROM listings WHERE slug LIKE ${slugBase + "%"} ORDER BY slug DESC LIMIT 1`;
          const slug = existingSlug.length > 0 ? `${slugBase}-${Date.now()}` : slugBase;
          const created = await createListing({
            slug,
            name: s.name,
            listing_type: s.listing_type,
            state_code: s.state_code,
            city_id: cityId,
            address: s.address,
            website_url: s.website_url,
            phone: s.phone,
            email: s.email,
            description: s.description
          });
          await updateSubmissionStatus(submissionId, "approved", created.id);
        }
      } else if (action === "reject") {
        await updateSubmissionStatus(submissionId, "rejected");
      } else if (action === "needs_info") {
        await updateSubmissionStatus(submissionId, "needs_info");
      } else if (action === "logout") {
        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": "admin_authed=; Path=/admin; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
            "Location": "/admin/"
          }
        });
      }
    }
  }
  const submissions = isAuthed ? await getPendingSubmissions() : [];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Admin | Southwest Galleries", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container" style="padding-top:2rem;padding-bottom:3rem;max-width:900px" data-astro-cid-u2h3djql> <h1 data-astro-cid-u2h3djql>Admin Dashboard</h1> ${!isAuthed ? renderTemplate`<div class="login-box" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Sign In</h2> ${authError && renderTemplate`<p class="error" data-astro-cid-u2h3djql>Incorrect password.</p>`} <form method="POST" data-astro-cid-u2h3djql> <input type="hidden" name="action" value="login" data-astro-cid-u2h3djql> <label for="password" data-astro-cid-u2h3djql>Password</label> <input type="password" id="password" name="password" autofocus data-astro-cid-u2h3djql> <button type="submit" data-astro-cid-u2h3djql>Sign In</button> </form> </div>` : renderTemplate`<div data-astro-cid-u2h3djql> <div class="admin-header" data-astro-cid-u2h3djql> <p data-astro-cid-u2h3djql>${submissions.length} pending submission${submissions.length !== 1 ? "s" : ""}</p> <form method="POST" style="display:inline" data-astro-cid-u2h3djql> <input type="hidden" name="action" value="logout" data-astro-cid-u2h3djql> <button type="submit" class="logout-btn" data-astro-cid-u2h3djql>Log Out</button> </form> </div> ${submissions.length === 0 ? renderTemplate`<p style="color:var(--muted);padding:2rem 0" data-astro-cid-u2h3djql>No pending submissions.</p>` : renderTemplate`<div class="submissions-list" data-astro-cid-u2h3djql> ${submissions.map((s) => renderTemplate`<div class="submission-card" data-astro-cid-u2h3djql> <div class="sub-header" data-astro-cid-u2h3djql> <div data-astro-cid-u2h3djql> <strong data-astro-cid-u2h3djql>${s.name}</strong> <span class="sub-type" data-astro-cid-u2h3djql>${s.listing_type}</span> </div> <span class="sub-date" data-astro-cid-u2h3djql>${new Date(s.created_at).toLocaleDateString()}</span> </div> <div class="sub-details" data-astro-cid-u2h3djql> <p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Location:</strong> ${s.city_name}, ${s.state_code}</p> ${s.address && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Address:</strong> ${s.address}</p>`} ${s.website_url && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Website:</strong> <a${addAttribute(s.website_url, "href")} target="_blank" data-astro-cid-u2h3djql>${s.website_url}</a></p>`} ${s.phone && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Phone:</strong> ${s.phone}</p>`} ${s.email && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Email:</strong> ${s.email}</p>`} ${s.description && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Description:</strong> ${s.description}</p>`} <p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Submitted by:</strong> ${s.submitter_name ?? "Unknown"} (${s.submitter_email})</p> ${s.submitter_note && renderTemplate`<p data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>Note:</strong> ${s.submitter_note}</p>`} </div> <div class="sub-actions" data-astro-cid-u2h3djql> <form method="POST" style="display:inline" data-astro-cid-u2h3djql> <input type="hidden" name="action" value="approve" data-astro-cid-u2h3djql> <input type="hidden" name="submission_id"${addAttribute(s.id, "value")} data-astro-cid-u2h3djql> <button type="submit" class="btn approve" data-astro-cid-u2h3djql>Approve</button> </form> <form method="POST" style="display:inline" data-astro-cid-u2h3djql> <input type="hidden" name="action" value="needs_info" data-astro-cid-u2h3djql> <input type="hidden" name="submission_id"${addAttribute(s.id, "value")} data-astro-cid-u2h3djql> <button type="submit" class="btn info" data-astro-cid-u2h3djql>Needs Info</button> </form> <form method="POST" style="display:inline" data-astro-cid-u2h3djql> <input type="hidden" name="action" value="reject" data-astro-cid-u2h3djql> <input type="hidden" name="submission_id"${addAttribute(s.id, "value")} data-astro-cid-u2h3djql> <button type="submit" class="btn reject" data-astro-cid-u2h3djql>Reject</button> </form> </div> </div>`)} </div>`} </div>`} </div> ` })}`;
}, "/Users/laresistenciapress/southwest-galleries/src/pages/admin/index.astro", void 0);
const $$file = "/Users/laresistenciapress/southwest-galleries/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

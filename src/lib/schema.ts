import { z } from 'zod';

const US_STATES = ['AZ', 'CO', 'NM', 'NV', 'TX', 'UT', 'CA'] as const;
const LISTING_TYPES = [
  'gallery', 'museum', 'cultural_center', 'artist_studio',
  'art_fair', 'sculpture_park', 'auction_house', 'art_school',
] as const;

export const submissionSchema = z.object({
  name: z.string().min(2).max(200),
  listing_type: z.enum(LISTING_TYPES),
  state_code: z.enum(US_STATES),
  city_name: z.string().min(2).max(100),
  address: z.string().max(300).optional(),
  website_url: z.string().url().optional().or(z.literal('')),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional().or(z.literal('')),
  description: z.string().max(2000).optional(),
  art_styles: z.array(z.string()).optional(),
  submitter_name: z.string().max(100).optional(),
  submitter_email: z.string().email(),
  submitter_note: z.string().max(500).optional(),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

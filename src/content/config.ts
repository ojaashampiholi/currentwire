import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    section: z.string(),
    slug: z.string(),
    importance: z.number().int(),
    tags: z.array(z.string()).default([]),
    top_picks: z.boolean().default(false),
    first_filed_ist: z.string(),
    last_updated_ist: z.string(),
    aeo_summary: z.string(),
    seo_title: z.string(),
    meta_description: z.string(),
    sources: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    ),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    image_credit: z.string().optional(),
    story_type: z.enum(['primary', 'secondary']),
  }),
});

const sections = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number().int(),
    blurb: z.string(),
  }),
});

export const collections = { stories, sections };

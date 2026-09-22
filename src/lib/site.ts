import { getCollection, type CollectionEntry } from 'astro:content';
import editionFile from '../data/editions/edition-2026-09-22.json';
import type { CardModel, Edition } from './types';

export type StoryEntry = CollectionEntry<'stories'>;
export type SectionEntry = CollectionEntry<'sections'>;

const STATUS_TAGS = new Set(['NEW', 'DEVELOPING', 'CONTINUING UPDATE', 'LIVE']);

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const edition20260922 = editionFile as Edition;

export const editions: Record<string, Edition> = {
  [edition20260922.date]: edition20260922,
};

export function latestEdition(): Edition {
  return Object.values(editions).sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function sitePath(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const cleaned = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleaned) return base;
  return `${base}${cleaned}/`;
}

export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function utcDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function longDateLabel(iso: string): string {
  const date = utcDate(iso);
  return `${WEEKDAYS[date.getUTCDay()]}, ${date.getUTCDate()} ${LONG_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function shortDateLabel(iso: string): string {
  const date = utcDate(iso);
  return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function recentEditionDates(anchor = latestEdition().date): string[] {
  const start = utcDate(anchor);
  const dates: string[] = [];
  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() - offset);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    dates.push(`${date.getUTCFullYear()}-${month}-${day}`);
  }
  return dates;
}

export function formatIst(stamp: string): string {
  const match = stamp.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s+(AM|PM)\s+IST$/i);
  if (!match) return stamp;
  const day = Number(match[3]);
  const month = SHORT_MONTHS[Number(match[2]) - 1];
  return `${day} ${month} ${match[1]}, ${Number(match[4])}:${match[5]} ${match[6].toUpperCase()} IST`;
}

export function istToMillis(stamp: string): number {
  const match = stamp.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i);
  if (!match) return 0;
  let hours = Number(match[4]) % 12;
  if (match[6].toUpperCase() === 'PM') hours += 12;
  const iso = `${match[1]}-${match[2]}-${match[3]}T${String(hours).padStart(2, '0')}:${match[5]}:00+05:30`;
  return Date.parse(iso);
}

export function statusTags(tags: string[]): string[] {
  return tags.filter((tag) => STATUS_TAGS.has(tag));
}

export function topicalTags(tags: string[]): string[] {
  return tags.filter((tag) => !STATUS_TAGS.has(tag));
}

export function compareStories(a: StoryEntry, b: StoryEntry): number {
  const byTime = istToMillis(b.data.last_updated_ist) - istToMillis(a.data.last_updated_ist);
  if (byTime) return byTime;
  const byImportance = b.data.importance - a.data.importance;
  if (byImportance) return byImportance;
  if (a.data.story_type !== b.data.story_type) {
    return a.data.story_type === 'primary' ? -1 : 1;
  }
  return a.data.title.localeCompare(b.data.title);
}

export function splitLadder(stories: StoryEntry[]): { middle: StoryEntry[]; rail: StoryEntry[] } {
  if (stories.length <= 3) {
    return { middle: stories.slice(0, 1), rail: stories.slice(1) };
  }
  return { middle: stories.slice(0, 3), rail: stories.slice(3) };
}

export function sectionsInOrder(sections: SectionEntry[], hubOrder: string[]): SectionEntry[] {
  const bySlug = new Map(sections.map((section) => [section.data.slug, section]));
  const ordered: SectionEntry[] = [];
  for (const slug of hubOrder) {
    const section = bySlug.get(slug);
    if (section) ordered.push(section);
  }
  const seen = new Set(ordered.map((section) => section.data.slug));
  const rest = sections
    .filter((section) => !seen.has(section.data.slug))
    .slice()
    .sort((a, b) => a.data.order - b.data.order);
  return ordered.concat(rest);
}

export function sectionTitle(sections: SectionEntry[], slug: string): string {
  return sections.find((section) => section.data.slug === slug)?.data.title ?? slug;
}

export function toCard(story: StoryEntry, sections: SectionEntry[]): CardModel {
  const title = sectionTitle(sections, story.data.section);
  return {
    href: sitePath(`story/${story.data.slug}`),
    title: story.data.title,
    subtitle: story.data.subtitle,
    sectionTitle: title,
    sectionHref: sitePath(`section/${story.data.section}`),
    statusTags: statusTags(story.data.tags),
    filedLabel: formatIst(story.data.first_filed_ist),
    updatedLabel: formatIst(story.data.last_updated_ist),
    sourceNames: story.data.sources.map((source) => source.name),
    image: story.data.image ? assetPath(story.data.image) : undefined,
    imageAlt: story.data.image_alt || story.data.title,
    imageCredit: story.data.image_credit,
  };
}

export function requireStories(slugs: string[], bySlug: Map<string, StoryEntry>): StoryEntry[] {
  return slugs.map((slug) => {
    const story = bySlug.get(slug);
    if (!story) throw new Error(`Edition references missing story: ${slug}`);
    return story;
  });
}

export async function loadDesk() {
  const [stories, sections] = await Promise.all([getCollection('stories'), getCollection('sections')]);
  return { stories, sections };
}

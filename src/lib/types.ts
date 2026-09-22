export interface Edition {
  date: string;
  label: string;
  timezone: string;
  last_updated_ist: string;
  kicker: string;
  top_picks: {
    middle: string[];
    rail: string[];
  };
  hub_order: string[];
  live_wire: string[];
}

export interface CardModel {
  href: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  sectionHref: string;
  statusTags: string[];
  filedLabel: string;
  updatedLabel: string;
  sourceNames: string[];
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
}

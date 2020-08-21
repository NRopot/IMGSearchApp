export interface IFilters {
  orientation?: string;
  collections?: any[];
}

type URLs = 'raw' | 'full' | 'regular' | 'small' | 'thumb';
type Links = 'self' | 'html' | 'download' | 'download_location';

export interface Photo {
  id?: string;
  alt_description: string;
  urls: Record<URLs, string>;
  links: Record<Links, string>;
  categories: string[];
  user: Record<string, any>;
}

export type StaticPageKey = 'about' | 'careers' | 'contact' | 'privacy' | 'terms' | 'sla';

export const STATIC_PAGE_ROUTES: Record<StaticPageKey, string> = {
  about: '/about',
  careers: '/careers',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  sla: '/sla'
};

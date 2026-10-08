import { useEffect } from 'react';
import { site } from '../config/site';

interface Meta {
  title: string;
  description: string;
  /** Route path, e.g. "/faqs". */
  path: string;
  noindex?: boolean;
}

function setMeta(selector: string, attr: 'content' | 'href', value: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const metaTag = (key: 'name' | 'property', name: string) => () => {
  const m = document.createElement('meta');
  m.setAttribute(key, name);
  return m;
};

/** Per-route title, description, canonical and social tags (updates the tags shipped in index.html). */
export function useDocumentMeta({ title, description, path, noindex }: Meta) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} · ${site.name}`;
    const url = `${site.url}${path === '/' ? '/' : path}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description, metaTag('name', 'description'));
    setMeta('meta[property="og:title"]', 'content', fullTitle, metaTag('property', 'og:title'));
    setMeta('meta[property="og:description"]', 'content', description, metaTag('property', 'og:description'));
    setMeta('meta[property="og:url"]', 'content', url, metaTag('property', 'og:url'));
    setMeta('meta[name="twitter:title"]', 'content', fullTitle, metaTag('name', 'twitter:title'));
    setMeta('meta[name="twitter:description"]', 'content', description, metaTag('name', 'twitter:description'));
    setMeta('link[rel="canonical"]', 'href', url, () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    });
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex' : 'index,follow', metaTag('name', 'robots'));
  }, [title, description, path, noindex]);
}

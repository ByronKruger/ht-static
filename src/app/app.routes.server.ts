import { RenderMode, ServerRoute } from '@angular/ssr';
import { environment } from '../environments/environment';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender, // home page
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender // services & pricing page
  },
  {
    path: 'about-us',
    renderMode: RenderMode.Prerender // about us page
  },
  {
    path: 'contact-us',
    renderMode: RenderMode.Prerender // contact us page
  },
  {
    path: 'era-of-ai',
    renderMode: RenderMode.Prerender // era of ai page
  },
  {
    path: 'blogs',
    renderMode: RenderMode.Prerender // blog list
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // fetch all published blog slugs from Strapi (build time)
      // const res = await fetch(`${process.env['STRAPI_URL']}/api/blogs`);
      const res = await fetch(`${environment.strapiApiUrl}/blogs`);
      const json = await res.json();
      return json.data.map((post: any) => ({ slug: post.slug || post.documentId }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // fallback
  }
];

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'movies',
    renderMode: RenderMode.Client,
  },
  {
    path: 'movie/:id',
    renderMode: RenderMode.Client,
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Taswira',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'home',
    title: 'Taswira',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.component'),
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie/movie.component'),
  },
];

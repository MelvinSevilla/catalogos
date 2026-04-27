import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'hogar',
    loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
  },
  {
    path: 'autorepuestos',
    loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
  },
  {
    path: 'ferreteria',
    loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
  }
];

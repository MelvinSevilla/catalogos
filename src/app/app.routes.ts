import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    children: [
      {
        path: 'hogar',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
      {
        path: 'autorepuesto',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
      {
        path: 'ferreteria',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
    ]
  },
  {
    path: 'pdf',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    children: [
      {
        path: 'hogar',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
      {
        path: 'autorepuesto',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
      {
        path: 'ferreteria',
        loadComponent: () => import('./pages/areas/areas').then(m => m.Areas)
      },
    ]
  }
];

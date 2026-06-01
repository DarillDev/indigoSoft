import { Routes } from '@angular/router';
import { InternalLayoutComponent } from './internal-layout.component';

export const INTERNAL_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('@features/feature-users').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'posts',
        loadChildren: () => import('@features/feature-posts').then((m) => m.POSTS_ROUTES),
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];

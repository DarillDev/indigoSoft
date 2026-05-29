import { Routes } from '@angular/router';
import { InternalLayoutComponent } from './internal-layout.component';

export const INTERNAL_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('@features/users').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'posts',
        loadChildren: () => import('@features/posts').then((m) => m.POSTS_ROUTES),
      },
    ],
  },
];

import { Routes } from '@angular/router';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/posts-list-page/posts-list-page.component').then(
        (m) => m.PostsListPageComponent,
      ),
  },
];

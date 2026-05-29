import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layouts/internal-layout/internal-layout.routes').then(
        (m) => m.INTERNAL_LAYOUT_ROUTES,
      ),
  },
];

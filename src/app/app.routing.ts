import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

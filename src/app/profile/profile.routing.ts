import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../shared/auth.guard';

const PROFILE_ROUTES: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);

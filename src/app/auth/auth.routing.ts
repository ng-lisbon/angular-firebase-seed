import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ActionComponent } from './action.component';
import { NotAuthGuard } from '../shared/notauth.guard';
import { PasswordResetComponent } from './password-reset.component';

const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'password-reset', component: PasswordResetComponent, canActivate: [NotAuthGuard] },
  { path: 'action', component: ActionComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);

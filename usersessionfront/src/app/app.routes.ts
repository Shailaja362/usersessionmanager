import { Routes } from '@angular/router';
import { Login } from './auth/login';
import { Register } from './auth/register';
import { Dashboard } from './dashboard/dashboard';
import { SessionForm } from './sessions/session-form';
import { SessionList } from './sessions/session-list';
import { AuthGuard } from './shared/guards/auth.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
  path: '',
  component: Layout,
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: Dashboard },
    { path: 'sessions/new', component: SessionForm },
    { path: 'sessions/list', component: SessionList },
    { path: 'delete/{id}', component: SessionList },
  ]
},
  { path: '**', redirectTo: 'login' },
];


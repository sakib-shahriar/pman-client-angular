import { Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthenticated } from './_helpers/app.route-auth';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsAuthenticated],
  },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    canActivate: [IsAuthenticated],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowUsersComponent } from './components/follow-users/follow-users.component';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AuthenticationGuard } from './shared/route-guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'follow-users',
    component: FollowUsersComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

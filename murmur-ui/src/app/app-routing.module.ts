import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowUsersComponent } from './components/follow-users/follow-users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
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
    path: 'register',
    component: RegisterComponent
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
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

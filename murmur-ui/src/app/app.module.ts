import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FollowUsersComponent } from './components/follow-users/follow-users.component';
import { MurmurTweetComponent } from './components/timeline/murmur-tweet/murmur-tweet.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MurmurTweetsControlComponent } from './components/murmur-tweets-control/murmur-tweets-control.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimelineComponent,
    FollowUsersComponent,
    MurmurTweetComponent,
    UserProfileComponent,
    MurmurTweetsControlComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly currentLoggedInUserName$ = this.authService.currentUser$.pipe(
    map(user => user?.name)
  );
  readonly isLoggedIn$ = this.authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if (isLoggedIn) {
        this.loggedInUserId = this.authService.getEnsuredLoggedInUserId();
      } else {
        this.loggedInUserId = -1;
      }
    })
  );

  loggedInUserId = -1;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.setLoggedInUser(null);
    this.router.navigate(['login']);
  }
}

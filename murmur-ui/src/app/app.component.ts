import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  readonly isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.setLoggedInUser(null);
    this.router.navigate(['login']);
  }
}

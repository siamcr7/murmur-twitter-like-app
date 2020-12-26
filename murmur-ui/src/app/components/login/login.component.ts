import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { isNullOrUndefined } from 'src/app/shared/utils/helper.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly users$ = this.apiService.getUsers$().pipe(
    tap(users => this.users = users)
  );
  private users: User[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(id: string): void {
    const loggedInUser = this.users.find((user) => user.id === +id);

    if (!isNullOrUndefined(loggedInUser)) {
      this.authService.setLoggedInUser(loggedInUser as User);
      this.router.navigate(['timeline']);
    }
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLoggedIn$(): Observable<boolean> { return this.isLoggedInBehaviorSubject.asObservable(); }
  get currentUser$(): Observable<User | null> { return this.currentUserBehaviorSubject.asObservable(); }

  private isLoggedInBehaviorSubject = new BehaviorSubject<boolean>(false);
  private currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  constructor() { }

  setLoggedInUser(user: User): void {
    this.currentUserBehaviorSubject.next(user);
    this.isLoggedInBehaviorSubject.next(true);
  }
}

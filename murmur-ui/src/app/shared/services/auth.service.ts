import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInBehaviorSubject.asObservable();
  }
  get currentUser$(): Observable<User | null> {
    return this.currentUserBehaviorSubject.asObservable();
  }

  private isLoggedInBehaviorSubject = new BehaviorSubject<boolean>(false);
  private currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  setLoggedInUser(user: User | null): void {
    this.currentUserBehaviorSubject.next(user);
    this.isLoggedInBehaviorSubject.next(user !== null);
  }

  getEnsuredLoggedInUserId(): number {
    const id = this.currentUserBehaviorSubject.getValue()?.id;
    if (id === undefined) {
      throw new Error('Unauthorized access!');
    }
    return id;
  }
}

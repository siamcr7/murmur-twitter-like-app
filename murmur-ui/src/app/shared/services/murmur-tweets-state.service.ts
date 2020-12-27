import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MurmurTweetsStateService {

  trigger$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  triggerChange(): void {
    this.trigger$.next(!this.trigger$.getValue());
  }
}

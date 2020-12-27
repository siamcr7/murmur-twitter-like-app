import { Component, OnInit, Self } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MurmurTweetDetails } from 'src/app/shared/models/murmur-tweet-details.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MurmurTweetsStateService } from 'src/app/shared/services/murmur-tweets-state.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit {

  readonly loggedInUserId = this.authService.getEnsuredLoggedInUserId();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private murmurStateService: MurmurTweetsStateService) { }

  ngOnInit(): void {
  }

  post(content: string): void {
    if (content.trim().length === 0) {
      return;
    }
    const id = this.authService.getEnsuredLoggedInUserId();
    this.apiService.addPost$({ content, userId: id }).subscribe(() => this.murmurStateService.triggerChange());
  }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UserWithFollowingInfo } from 'src/app/shared/models/user-with-following-info.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-follow-users',
  templateUrl: './follow-users.component.html',
  styleUrls: ['./follow-users.component.css']
})
export class FollowUsersComponent implements OnInit {

  private trigger$ = new BehaviorSubject<boolean>(false);

  readonly usersWithFollowingInfo$: Observable<UserWithFollowingInfo[]> = this.trigger$.pipe(
    mergeMap(() => {
      const loggedInUserId = this.authService.getEnsuredLoggedInUserId();
      const apiCall$ = forkJoin({
        users: this.apiService.getUsers$(),
        followingUserIds: this.apiService.getFollowingUserIds$(loggedInUserId),
      });
      return apiCall$;
    }),
    map(resonse => {
      const followingMapped = new Map<number, boolean>([
        ...resonse.followingUserIds.map(u => [u, true] as [number, boolean])
      ]);
      const loggedInUserId = this.authService.getEnsuredLoggedInUserId();

      return resonse.users.filter(user => user.id !== loggedInUserId).map(user => {
        return {
          id: user.id,
          isFollowing: followingMapped.has(user.id),
          name: user.name
        } as UserWithFollowingInfo;
      });
    })
  );

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  follow(id: number): void {
    const loggedInUserId = this.authService.getEnsuredLoggedInUserId();
    this.apiService.addFollower$(loggedInUserId, id).subscribe(() => this.triggerChange());
  }

  unfollow(id: number): void {
    const loggedInUserId = this.authService.getEnsuredLoggedInUserId();
    this.apiService.deleteFollower$(loggedInUserId, id).subscribe(() => this.triggerChange());
  }

  private triggerChange(): void {
    this.trigger$.next(!this.trigger$.getValue());
  }
}

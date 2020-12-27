import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { isNullOrUndefined } from 'src/app/shared/utils/helper.util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  readonly userId$: Observable<number> = this.route.paramMap.pipe(
    filter(paramMap => paramMap.has('id') && !isNullOrUndefined(paramMap.get('id'))),
    map(paramMap => Number.parseInt(paramMap.get('id') as string, undefined)),
    shareReplay(1)
  );

  readonly userDisplayName$: Observable<string | undefined> = this.userId$.pipe(
    mergeMap(userId => this.apiService.getUsers$().pipe(
      map(users => users.find(user => user.id === +userId)?.name)
    ))
  );

  readonly followingCount$ = this.userId$.pipe(
    mergeMap(userId => this.apiService.getFollowingUserIds$(userId)),
    map(ids => ids.length)
  );

  readonly followerCount$ = this.userId$.pipe(
    mergeMap(userId => this.apiService.getFollowersUserIds$(userId)),
    map(ids => ids.length)
  );

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { mergeMap, map, filter } from 'rxjs/operators';
import { MurmurTweetDetails } from 'src/app/shared/models/murmur-tweet-details.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MurmurTweetsStateService } from 'src/app/shared/services/murmur-tweets-state.service';

@Component({
  selector: 'app-murmur-tweets-control',
  templateUrl: './murmur-tweets-control.component.html',
  styleUrls: ['./murmur-tweets-control.component.css']
})
export class MurmurTweetsControlComponent implements OnInit {

  @Input() userId: number | null = null;
  @Input() onlyForSelf: boolean | null = null;

  private skip = 0;
  private totalMurmurs = new BehaviorSubject<number>(0);

  totalMurmurs$ = this.totalMurmurs.asObservable();
  readonly murmurTweetDetails$: Observable<MurmurTweetDetails[]> = this.murmurStateService.trigger$.pipe(
    filter(_ => this.userId !== null && this.onlyForSelf !== null),
    mergeMap(() => {
      return forkJoin({
        users: this.apiService.getUsers$(),
        posts: this.apiService.getPosts$(this.userId as number, this.onlyForSelf as boolean),
        likedPosts: this.apiService.getLikedPosts$(this.authService.getEnsuredLoggedInUserId())
      });
    }),
    map(res => {
      const userDisplayNameMappedToId = new Map<number, string>([
        ...res.users.map(user => [user.id, user.name] as [number, string])
      ]);

      const likedPostIdsMapped = new Map<number, boolean>([
        ...res.likedPosts.map(postId => [postId, true] as [number, boolean])
      ]);

      return res.posts.map(post => {
        return {
          canDelete: post.userId === this.userId as number,
          content: post.content,
          isLiked: likedPostIdsMapped.has(post.id as number),
          likeCount: post.likeCount ?? 0,
          userDisplayName: userDisplayNameMappedToId.get(post.userId),
          userId: post.userId,
          id: post.id
        } as MurmurTweetDetails;
      });
    }),
    map(res => {
      this.totalMurmurs.next(res.length);
      return res.slice(this.skip, Math.min(this.skip + 10, res.length));
    })
  );

  constructor(
    private apiService: ApiService,
    private murmurStateService: MurmurTweetsStateService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  deletePost(postId: any): void {
    this.apiService.deletePost$(+postId).subscribe(() => this.murmurStateService.triggerChange());
  }

  likePost(postId: any): void {
    this.apiService.addPostLike$(this.authService.getEnsuredLoggedInUserId(), +postId)
      .subscribe(() => this.murmurStateService.triggerChange());
  }

  unlikePost(postId: any): void {
    this.apiService.deletePostLike$(this.authService.getEnsuredLoggedInUserId(), +postId)
      .subscribe(() => this.murmurStateService.triggerChange());
  }

  pagination(skip: any): void {
    this.skip = +skip;
    this.murmurStateService.triggerChange();
  }
}

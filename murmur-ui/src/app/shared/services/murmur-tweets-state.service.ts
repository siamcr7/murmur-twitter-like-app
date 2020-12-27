import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MurmurTweetDetails } from '../models/murmur-tweet-details.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class MurmurTweetsStateService {

  private trigger$ = new BehaviorSubject<boolean>(false);
  private skip = 0;
  private totalMurmurs = new BehaviorSubject<number>(0);

  totalMurmurs$ = this.totalMurmurs.asObservable();
  readonly murmurTweetDetails$: Observable<MurmurTweetDetails[]> = this.trigger$.pipe(
    mergeMap(() => {
      return forkJoin({
        users: this.apiService.getUsers$(),
        posts: this.apiService.getPosts$(this.authService.getEnsuredLoggedInUserId()),
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
          canDelete: post.userId === this.authService.getEnsuredLoggedInUserId(),
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

  constructor(private apiService: ApiService, private authService: AuthService) { }

  // deletePost(postId: any): void {
  //   this.apiService.deletePost$(+postId).subscribe(() => this.triggerChange());
  // }

  // likePost(postId: any): void {
  //   this.apiService.addPostLike$(this.authService.getEnsuredLoggedInUserId(), +postId).subscribe(() => this.triggerChange());
  // }

  // unlikePost(postId: any): void {
  //   this.apiService.deletePostLike$(this.authService.getEnsuredLoggedInUserId(), +postId).subscribe(() => this.triggerChange());
  // }

  pagination(skip: any): void {
    this.skip = +skip;
    this.triggerChange();
  }

  triggerChange(): void {
    this.trigger$.next(!this.trigger$.getValue());
  }
}

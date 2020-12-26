import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MurmurTweetDetails } from 'src/app/shared/models/murmur-tweet-details.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  private trigger$ = new BehaviorSubject<boolean>(false);

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
      })
    })
  );

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  post(content: string): void {
    if (content.trim().length === 0) {
      return;
    }
    const id = this.authService.getEnsuredLoggedInUserId();
    this.apiService.addPost$({ content, userId: id }).subscribe(() => this.triggerChange());
  }

  deletePost(postId: any): void {
    this.apiService.deletePost$(+postId).subscribe(() => this.triggerChange());
  }

  likePost(postId: any): void {
    this.apiService.addPostLike$(this.authService.getEnsuredLoggedInUserId(), +postId).subscribe(() => this.triggerChange());
  }

  unlikePost(postId: any): void {
    this.apiService.deletePostLike$(this.authService.getEnsuredLoggedInUserId(), +postId).subscribe(() => this.triggerChange());
  }

  private triggerChange(): void {
    this.trigger$.next(!this.trigger$.getValue());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MurmurTweetDetails } from '../models/murmur-tweet-details.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO: load from appsettings.json
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}/users`).pipe(
      tap(res => console.log('Fetched Users: ', res))
    );
  }

  getFollowingUserIds$(userId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.API_URL}/followers/followings/${userId}`).pipe(
      tap(res => console.log('Get Following User Ids: ', res))
    );
  }

  getFollowersUserIds$(userId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.API_URL}/followers/followers/${userId}`).pipe(
      tap(res => console.log('Get Followers User Ids: ', res))
    );
  }

  getPosts$(userId: number, onlySelf: boolean): Observable<MurmurTweetDetails[]> {
    return this.httpClient.get<MurmurTweetDetails[]>(`${this.API_URL}/posts/${userId}/${onlySelf}`).pipe(
      tap(res => console.log('Get Posts: ', res))
    );
  }

  getLikedPosts$(userId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.API_URL}/posts/liked/${userId}`).pipe(
      tap(res => console.log('Get Liked Posts: ', res))
    );
  }

  addPost$(post: Post): Observable<{}> {
    return this.httpClient.post<{}>(`${this.API_URL}/posts`, post).pipe(
      tap(_ => console.log('Added Post'))
    );
  }

  addPostLike$(userId: number, postId: number): Observable<{}> {
    return this.httpClient.post<{}>(`${this.API_URL}/posts/like`, { userId, postId }).pipe(
      tap(_ => console.log('Liked Post'))
    );
  }

  addFollower$(userId: number, followingUserId: number): Observable<{}> {
    return this.httpClient.post<{}>(`${this.API_URL}/followers`, { userId, followingUserId }).pipe(
      tap(_ => console.log('Added Follower'))
    );
  }

  addUser$(name: string): Observable<{}> {
    return this.httpClient.post<{}>(`${this.API_URL}/users`, { name }).pipe(
      tap(_ => console.log('Added User'))
    );
  }

  deleteFollower$(userId: number, followingUserId: number): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.API_URL}/followers/${userId}/${followingUserId}`).pipe(
      tap(_ => console.log('Deleted Follower'))
    );
  }

  deletePostLike$(userId: number, postId: number): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.API_URL}/posts/like/${userId}/${postId}`).pipe(
      tap(_ => console.log('UnLiked Post'))
    );
  }

  deletePost$(postId: number): Observable<{}> {
    return this.httpClient.delete<{}>(`${this.API_URL}/posts/${postId}`).pipe(
      tap(_ => console.log('Deleted Post'))
    );
  }
}

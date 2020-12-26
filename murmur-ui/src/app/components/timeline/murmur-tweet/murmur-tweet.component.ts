import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MurmurTweetDetails } from 'src/app/shared/models/murmur-tweet-details.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-murmur-tweet',
  templateUrl: './murmur-tweet.component.html',
  styleUrls: ['./murmur-tweet.component.css']
})
export class MurmurTweetComponent implements OnInit {

  @Input() murmurTweets: MurmurTweetDetails[] | null = [];

  @Output() likePost = new EventEmitter<number>();
  @Output() unlikePost = new EventEmitter<number>();
  @Output() deletePost = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

}

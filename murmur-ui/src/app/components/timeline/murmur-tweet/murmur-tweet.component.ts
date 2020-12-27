import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MurmurTweetDetails } from 'src/app/shared/models/murmur-tweet-details.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-murmur-tweet',
  templateUrl: './murmur-tweet.component.html',
  styleUrls: ['./murmur-tweet.component.css']
})
export class MurmurTweetComponent implements OnChanges {

  pageNumbers: number[] = [];
  @Input() murmurTweets: MurmurTweetDetails[] | null = [];
  @Input() totalMurmurs = 0;

  @Output() likePost = new EventEmitter<number>();
  @Output() unlikePost = new EventEmitter<number>();
  @Output() deletePost = new EventEmitter<number>();
  @Output() pagination = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(): void {
    let tempPageNumber = Math.floor(this.totalMurmurs / 10);
    if (this.totalMurmurs % 10 !== 0) {
      tempPageNumber++;
    }

    this.pageNumbers = [];
    for (let index = 0; index < tempPageNumber; index++) {
      this.pageNumbers.push(index);
    }

    console.log('See numbers: ', this.pageNumbers);
  }

}

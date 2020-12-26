import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  post(content: string): void {
    const id = this.authService.getLoggedInUserId();
    if (id === undefined) {
      throw new Error('Unauthorized access!');
    }

    this.apiService.addPost$({ content, userId: id }).subscribe();
  }
}

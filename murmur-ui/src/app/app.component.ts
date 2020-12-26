import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data$: Observable<any[]> = this.httpClient.get<any>('http://localhost:8000/api/user', {

  }).pipe(
    tap(res => console.log('See Res: ', res)),
    map(res => res.rows)
  );

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.data$.subscribe();
  }
}

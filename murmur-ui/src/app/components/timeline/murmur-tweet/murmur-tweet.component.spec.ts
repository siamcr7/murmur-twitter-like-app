import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurmurTweetComponent } from './murmur-tweet.component';

describe('MurmurTweetComponent', () => {
  let component: MurmurTweetComponent;
  let fixture: ComponentFixture<MurmurTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurmurTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurmurTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

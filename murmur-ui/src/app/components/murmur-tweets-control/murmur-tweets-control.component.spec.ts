import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurmurTweetsControlComponent } from './murmur-tweets-control.component';

describe('MurmurTweetsControlComponent', () => {
  let component: MurmurTweetsControlComponent;
  let fixture: ComponentFixture<MurmurTweetsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurmurTweetsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurmurTweetsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

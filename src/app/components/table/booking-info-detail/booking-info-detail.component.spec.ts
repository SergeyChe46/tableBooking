import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingInfoDetailComponent } from './booking-info-detail.component';

describe('BookingInfoDetailComponent', () => {
  let component: BookingInfoDetailComponent;
  let fixture: ComponentFixture<BookingInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingInfoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

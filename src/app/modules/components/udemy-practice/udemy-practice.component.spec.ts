import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdemyPracticeComponent } from './udemy-practice.component';

describe('UdemyPracticeComponent', () => {
  let component: UdemyPracticeComponent;
  let fixture: ComponentFixture<UdemyPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdemyPracticeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UdemyPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEndRoundComponent } from './exam-end-round.component';

describe('ExamEndRoundComponent', () => {
  let component: ExamEndRoundComponent;
  let fixture: ComponentFixture<ExamEndRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamEndRoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamEndRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

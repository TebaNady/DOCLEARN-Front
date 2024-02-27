import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFacultyComponent } from './choose-faculty.component';

describe('ChooseFacultyComponent', () => {
  let component: ChooseFacultyComponent;
  let fixture: ComponentFixture<ChooseFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

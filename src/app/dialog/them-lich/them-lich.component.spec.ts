import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemLichComponent } from './them-lich.component';

describe('ThemLichComponent', () => {
  let component: ThemLichComponent;
  let fixture: ComponentFixture<ThemLichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemLichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

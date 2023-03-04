import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyLichComponent } from './quanly-lich.component';

describe('QuanlyLichComponent', () => {
  let component: QuanlyLichComponent;
  let fixture: ComponentFixture<QuanlyLichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyLichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

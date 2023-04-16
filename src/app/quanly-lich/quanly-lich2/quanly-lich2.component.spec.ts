import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyLich2Component } from './quanly-lich2.component';

describe('QuanlyLich2Component', () => {
  let component: QuanlyLich2Component;
  let fixture: ComponentFixture<QuanlyLich2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyLich2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyLich2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

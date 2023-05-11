import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemLopHocPhanComponent } from './them-lop-hoc-phan.component';

describe('ThemLopHocPhanComponent', () => {
  let component: ThemLopHocPhanComponent;
  let fixture: ComponentFixture<ThemLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemLopHocPhanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

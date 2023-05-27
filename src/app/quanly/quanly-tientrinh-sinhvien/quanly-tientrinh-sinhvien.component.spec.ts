import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTientrinhSinhvienComponent } from './quanly-tientrinh-sinhvien.component';

describe('QuanlyTientrinhSinhvienComponent', () => {
  let component: QuanlyTientrinhSinhvienComponent;
  let fixture: ComponentFixture<QuanlyTientrinhSinhvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTientrinhSinhvienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTientrinhSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

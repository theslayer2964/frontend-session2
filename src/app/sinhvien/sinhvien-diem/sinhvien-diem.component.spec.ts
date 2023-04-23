import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienDiemComponent } from './sinhvien-diem.component';

describe('SinhvienDiemComponent', () => {
  let component: SinhvienDiemComponent;
  let fixture: ComponentFixture<SinhvienDiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienDiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

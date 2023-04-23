import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienLichComponent } from './sinhvien-lich.component';

describe('SinhvienLichComponent', () => {
  let component: SinhvienLichComponent;
  let fixture: ComponentFixture<SinhvienLichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienLichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

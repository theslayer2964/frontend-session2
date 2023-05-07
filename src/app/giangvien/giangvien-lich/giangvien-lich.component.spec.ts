import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangvienLichComponent } from './giangvien-lich.component';

describe('GiangvienLichComponent', () => {
  let component: GiangvienLichComponent;
  let fixture: ComponentFixture<GiangvienLichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiangvienLichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiangvienLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

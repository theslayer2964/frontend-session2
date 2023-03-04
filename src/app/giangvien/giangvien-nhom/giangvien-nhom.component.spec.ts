import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangvienNhomComponent } from './giangvien-nhom.component';

describe('GiangvienNhomComponent', () => {
  let component: GiangvienNhomComponent;
  let fixture: ComponentFixture<GiangvienNhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiangvienNhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiangvienNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

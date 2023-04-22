import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyGiangvienComponent } from './quanly-giangvien.component';

describe('QuanlyGiangvienComponent', () => {
  let component: QuanlyGiangvienComponent;
  let fixture: ComponentFixture<QuanlyGiangvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyGiangvienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

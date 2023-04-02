import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyNhomComponent } from './quanly-nhom.component';

describe('QuanlyNhomComponent', () => {
  let component: QuanlyNhomComponent;
  let fixture: ComponentFixture<QuanlyNhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyNhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

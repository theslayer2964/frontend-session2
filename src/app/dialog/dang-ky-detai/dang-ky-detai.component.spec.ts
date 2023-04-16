import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangKyDetaiComponent } from './dang-ky-detai.component';

describe('DangKyDetaiComponent', () => {
  let component: DangKyDetaiComponent;
  let fixture: ComponentFixture<DangKyDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangKyDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangKyDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

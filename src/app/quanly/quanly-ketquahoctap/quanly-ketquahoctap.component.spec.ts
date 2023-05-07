import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyKetquahoctapComponent } from './quanly-ketquahoctap.component';

describe('QuanlyKetquahoctapComponent', () => {
  let component: QuanlyKetquahoctapComponent;
  let fixture: ComponentFixture<QuanlyKetquahoctapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyKetquahoctapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyKetquahoctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

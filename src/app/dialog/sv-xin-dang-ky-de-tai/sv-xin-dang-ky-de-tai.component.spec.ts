import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvXinDangKyDeTaiComponent } from './sv-xin-dang-ky-de-tai.component';

describe('SvXinDangKyDeTaiComponent', () => {
  let component: SvXinDangKyDeTaiComponent;
  let fixture: ComponentFixture<SvXinDangKyDeTaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvXinDangKyDeTaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvXinDangKyDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

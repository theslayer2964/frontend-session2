import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyLichContainerComponent } from './quanly-lich-container.component';

describe('QuanlyLichContainerComponent', () => {
  let component: QuanlyLichContainerComponent;
  let fixture: ComponentFixture<QuanlyLichContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyLichContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyLichContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

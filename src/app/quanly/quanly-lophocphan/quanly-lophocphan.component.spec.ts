import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyLophocphanComponent } from './quanly-lophocphan.component';

describe('QuanlyLophocphanComponent', () => {
  let component: QuanlyLophocphanComponent;
  let fixture: ComponentFixture<QuanlyLophocphanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyLophocphanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyLophocphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

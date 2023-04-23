import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyPhieuchamComponent } from './quanly-phieucham.component';

describe('QuanlyPhieuchamComponent', () => {
  let component: QuanlyPhieuchamComponent;
  let fixture: ComponentFixture<QuanlyPhieuchamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyPhieuchamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyPhieuchamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

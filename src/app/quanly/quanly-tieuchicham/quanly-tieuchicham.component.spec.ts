import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTieuchichamComponent } from './quanly-tieuchicham.component';

describe('QuanlyTieuchichamComponent', () => {
  let component: QuanlyTieuchichamComponent;
  let fixture: ComponentFixture<QuanlyTieuchichamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTieuchichamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTieuchichamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyDetaiComponent } from './quanly-detai.component';

describe('QuanlyDetaiComponent', () => {
  let component: QuanlyDetaiComponent;
  let fixture: ComponentFixture<QuanlyDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTientrinhComponent } from './quanly-tientrinh.component';

describe('QuanlyTientrinhComponent', () => {
  let component: QuanlyTientrinhComponent;
  let fixture: ComponentFixture<QuanlyTientrinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTientrinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTientrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

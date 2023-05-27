import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTientrinhChungComponent } from './quanly-tientrinh-chung.component';

describe('QuanlyTientrinhChungComponent', () => {
  let component: QuanlyTientrinhChungComponent;
  let fixture: ComponentFixture<QuanlyTientrinhChungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTientrinhChungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTientrinhChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

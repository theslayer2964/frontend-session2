import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTientrinhDetaiComponent } from './quanly-tientrinh-detai.component';

describe('QuanlyTientrinhDetaiComponent', () => {
  let component: QuanlyTientrinhDetaiComponent;
  let fixture: ComponentFixture<QuanlyTientrinhDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTientrinhDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTientrinhDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

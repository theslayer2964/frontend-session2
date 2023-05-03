import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlXepTKBComponent } from './ql-xep-tkb.component';

describe('QlXepTKBComponent', () => {
  let component: QlXepTKBComponent;
  let fixture: ComponentFixture<QlXepTKBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlXepTKBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlXepTKBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

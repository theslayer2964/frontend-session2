import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlXepTKBHDComponent } from './ql-xep-tkb-hd.component';

describe('QlXepTKBHDComponent', () => {
  let component: QlXepTKBHDComponent;
  let fixture: ComponentFixture<QlXepTKBHDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlXepTKBHDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlXepTKBHDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlPcGvhdComponent } from './ql-pc-gvhd.component';

describe('QlPcGvhdComponent', () => {
  let component: QlPcGvhdComponent;
  let fixture: ComponentFixture<QlPcGvhdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlPcGvhdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlPcGvhdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

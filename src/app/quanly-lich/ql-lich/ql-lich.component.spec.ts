import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlLichComponent } from './ql-lich.component';

describe('QlLichComponent', () => {
  let component: QlLichComponent;
  let fixture: ComponentFixture<QlLichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlLichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

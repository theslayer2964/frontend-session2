import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlTkbChianhomComponent } from './ql-tkb-chianhom.component';

describe('QlTkbChianhomComponent', () => {
  let component: QlTkbChianhomComponent;
  let fixture: ComponentFixture<QlTkbChianhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlTkbChianhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlTkbChianhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

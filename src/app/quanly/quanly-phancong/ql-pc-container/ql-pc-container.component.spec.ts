import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlPcContainerComponent } from './ql-pc-container.component';

describe('QlPcContainerComponent', () => {
  let component: QlPcContainerComponent;
  let fixture: ComponentFixture<QlPcContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlPcContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlPcContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlChitietlichComponent } from './ql-chitietlich.component';

describe('QlChitietlichComponent', () => {
  let component: QlChitietlichComponent;
  let fixture: ComponentFixture<QlChitietlichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlChitietlichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlChitietlichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

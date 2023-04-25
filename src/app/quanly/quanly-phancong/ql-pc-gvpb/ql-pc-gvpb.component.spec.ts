import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlPcGvpbComponent } from './ql-pc-gvpb.component';

describe('QlPcGvpbComponent', () => {
  let component: QlPcGvpbComponent;
  let fixture: ComponentFixture<QlPcGvpbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlPcGvpbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlPcGvpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

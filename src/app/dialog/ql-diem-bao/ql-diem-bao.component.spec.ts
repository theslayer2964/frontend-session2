import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDiemBaoComponent } from './ql-diem-bao.component';

describe('QlDiemBaoComponent', () => {
  let component: QlDiemBaoComponent;
  let fixture: ComponentFixture<QlDiemBaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlDiemBaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlDiemBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

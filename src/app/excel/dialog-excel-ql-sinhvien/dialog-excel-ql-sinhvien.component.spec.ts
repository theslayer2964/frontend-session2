import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcelQlSinhvienComponent } from './dialog-excel-ql-sinhvien.component';

describe('DialogExcelQlSinhvienComponent', () => {
  let component: DialogExcelQlSinhvienComponent;
  let fixture: ComponentFixture<DialogExcelQlSinhvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcelQlSinhvienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcelQlSinhvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

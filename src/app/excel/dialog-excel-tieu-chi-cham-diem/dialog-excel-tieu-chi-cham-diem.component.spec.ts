import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcelTieuChiChamDiemComponent } from './dialog-excel-tieu-chi-cham-diem.component';

describe('DialogExcelTieuChiChamDiemComponent', () => {
  let component: DialogExcelTieuChiChamDiemComponent;
  let fixture: ComponentFixture<DialogExcelTieuChiChamDiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcelTieuChiChamDiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcelTieuChiChamDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

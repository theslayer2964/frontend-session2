import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcelQlGiangvienComponent } from './dialog-excel-ql-giangvien.component';

describe('DialogExcelQlGiangvienComponent', () => {
  let component: DialogExcelQlGiangvienComponent;
  let fixture: ComponentFixture<DialogExcelQlGiangvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcelQlGiangvienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcelQlGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

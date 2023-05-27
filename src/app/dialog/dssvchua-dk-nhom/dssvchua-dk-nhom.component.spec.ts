import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSSVChuaDkNhomComponent } from './dssvchua-dk-nhom.component';

describe('DSSVChuaDkNhomComponent', () => {
  let component: DSSVChuaDkNhomComponent;
  let fixture: ComponentFixture<DSSVChuaDkNhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSSVChuaDkNhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DSSVChuaDkNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

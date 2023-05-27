import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSNhomChuaDkDeTaiComponent } from './dsnhom-chua-dk-de-tai.component';

describe('DSNhomChuaDkDeTaiComponent', () => {
  let component: DSNhomChuaDkDeTaiComponent;
  let fixture: ComponentFixture<DSNhomChuaDkDeTaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSNhomChuaDkDeTaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DSNhomChuaDkDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

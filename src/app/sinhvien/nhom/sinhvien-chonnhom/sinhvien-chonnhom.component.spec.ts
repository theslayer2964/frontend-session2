import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienChonnhomComponent } from './sinhvien-chonnhom.component';

describe('SinhvienChonnhomComponent', () => {
  let component: SinhvienChonnhomComponent;
  let fixture: ComponentFixture<SinhvienChonnhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienChonnhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienChonnhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

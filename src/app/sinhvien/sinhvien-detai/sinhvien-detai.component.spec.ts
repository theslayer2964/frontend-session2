import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienDetaiComponent } from './sinhvien-detai.component';

describe('SinhvienDetaiComponent', () => {
  let component: SinhvienDetaiComponent;
  let fixture: ComponentFixture<SinhvienDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienContainerComponent } from './sinhvien-container.component';

describe('SinhvienContainerComponent', () => {
  let component: SinhvienContainerComponent;
  let fixture: ComponentFixture<SinhvienContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

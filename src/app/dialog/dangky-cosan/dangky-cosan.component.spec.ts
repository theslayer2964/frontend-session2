import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyCosanComponent } from './dangky-cosan.component';

describe('DangkyCosanComponent', () => {
  let component: DangkyCosanComponent;
  let fixture: ComponentFixture<DangkyCosanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkyCosanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangkyCosanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HethongComponent } from './hethong.component';

describe('HethongComponent', () => {
  let component: HethongComponent;
  let fixture: ComponentFixture<HethongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HethongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HethongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

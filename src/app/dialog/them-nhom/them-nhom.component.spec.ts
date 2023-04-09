import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemNhomComponent } from './them-nhom.component';

describe('ThemNhomComponent', () => {
  let component: ThemNhomComponent;
  let fixture: ComponentFixture<ThemNhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemNhomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

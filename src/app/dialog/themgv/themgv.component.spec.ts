import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemgvComponent } from './themgv.component';

describe('ThemgvComponent', () => {
  let component: ThemgvComponent;
  let fixture: ComponentFixture<ThemgvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemgvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemHockyComponent } from './them-hocky.component';

describe('ThemHockyComponent', () => {
  let component: ThemHockyComponent;
  let fixture: ComponentFixture<ThemHockyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemHockyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemHockyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

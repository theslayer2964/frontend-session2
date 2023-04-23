import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSvComponent } from './them-sv.component';

describe('ThemSvComponent', () => {
  let component: ThemSvComponent;
  let fixture: ComponentFixture<ThemSvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemSvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemLichQlComponent } from './them-lich-ql.component';

describe('ThemLichQlComponent', () => {
  let component: ThemLichQlComponent;
  let fixture: ComponentFixture<ThemLichQlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemLichQlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemLichQlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

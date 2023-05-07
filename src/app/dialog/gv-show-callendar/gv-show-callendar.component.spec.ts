import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvShowCallendarComponent } from './gv-show-callendar.component';

describe('GvShowCallendarComponent', () => {
  let component: GvShowCallendarComponent;
  let fixture: ComponentFixture<GvShowCallendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GvShowCallendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GvShowCallendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GvChamdiemComponent } from './gv-chamdiem.component';

describe('GvChamdiemComponent', () => {
  let component: GvChamdiemComponent;
  let fixture: ComponentFixture<GvChamdiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GvChamdiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GvChamdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

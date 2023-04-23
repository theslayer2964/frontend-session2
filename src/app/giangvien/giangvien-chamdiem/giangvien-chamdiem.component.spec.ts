import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangvienChamdiemComponent } from './giangvien-chamdiem.component';

describe('GiangvienChamdiemComponent', () => {
  let component: GiangvienChamdiemComponent;
  let fixture: ComponentFixture<GiangvienChamdiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiangvienChamdiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiangvienChamdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

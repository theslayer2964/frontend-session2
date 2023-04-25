import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTieuChiChamdiemComponent } from './them-tieu-chi-chamdiem.component';

describe('ThemTieuChiChamdiemComponent', () => {
  let component: ThemTieuChiChamdiemComponent;
  let fixture: ComponentFixture<ThemTieuChiChamdiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemTieuChiChamdiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemTieuChiChamdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

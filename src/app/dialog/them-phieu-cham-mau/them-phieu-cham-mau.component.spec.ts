import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemPhieuChamMauComponent } from './them-phieu-cham-mau.component';

describe('ThemPhieuChamMauComponent', () => {
  let component: ThemPhieuChamMauComponent;
  let fixture: ComponentFixture<ThemPhieuChamMauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemPhieuChamMauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemPhieuChamMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

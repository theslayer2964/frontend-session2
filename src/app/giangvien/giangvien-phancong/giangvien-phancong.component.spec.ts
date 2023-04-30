import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangvienPhancongComponent } from './giangvien-phancong.component';

describe('GiangvienPhancongComponent', () => {
  let component: GiangvienPhancongComponent;
  let fixture: ComponentFixture<GiangvienPhancongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiangvienPhancongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiangvienPhancongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

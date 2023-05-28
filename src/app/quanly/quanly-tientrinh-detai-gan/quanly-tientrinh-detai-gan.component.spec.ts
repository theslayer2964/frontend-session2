import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyTientrinhDetaiGanComponent } from './quanly-tientrinh-detai-gan.component';

describe('QuanlyTientrinhDetaiGanComponent', () => {
  let component: QuanlyTientrinhDetaiGanComponent;
  let fixture: ComponentFixture<QuanlyTientrinhDetaiGanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyTientrinhDetaiGanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyTientrinhDetaiGanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

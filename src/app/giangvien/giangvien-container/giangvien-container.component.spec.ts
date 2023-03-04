import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiangvienContainerComponent } from './giangvien-container.component';

describe('GiangvienContainerComponent', () => {
  let component: GiangvienContainerComponent;
  let fixture: ComponentFixture<GiangvienContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiangvienContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiangvienContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

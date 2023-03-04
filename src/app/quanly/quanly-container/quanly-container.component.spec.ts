import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlyContainerComponent } from './quanly-container.component';

describe('QuanlyContainerComponent', () => {
  let component: QuanlyContainerComponent;
  let fixture: ComponentFixture<QuanlyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlyContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

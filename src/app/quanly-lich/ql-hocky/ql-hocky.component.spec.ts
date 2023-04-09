import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlHockyComponent } from './ql-hocky.component';

describe('QlHockyComponent', () => {
  let component: QlHockyComponent;
  let fixture: ComponentFixture<QlHockyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlHockyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlHockyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

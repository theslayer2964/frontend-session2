import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlThemgvpbComponent } from './ql-themgvpb.component';

describe('QlThemgvpbComponent', () => {
  let component: QlThemgvpbComponent;
  let fixture: ComponentFixture<QlThemgvpbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlThemgvpbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlThemgvpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlKltnComponent } from './ql-kltn.component';

describe('QlKltnComponent', () => {
  let component: QlKltnComponent;
  let fixture: ComponentFixture<QlKltnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlKltnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlKltnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

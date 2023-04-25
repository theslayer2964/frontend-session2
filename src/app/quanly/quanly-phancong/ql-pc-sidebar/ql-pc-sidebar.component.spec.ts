import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlPcSidebarComponent } from './ql-pc-sidebar.component';

describe('QlPcSidebarComponent', () => {
  let component: QlPcSidebarComponent;
  let fixture: ComponentFixture<QlPcSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlPcSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlPcSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

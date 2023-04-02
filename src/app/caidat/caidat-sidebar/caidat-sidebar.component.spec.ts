import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaidatSidebarComponent } from './caidat-sidebar.component';

describe('CaidatSidebarComponent', () => {
  let component: CaidatSidebarComponent;
  let fixture: ComponentFixture<CaidatSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaidatSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaidatSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

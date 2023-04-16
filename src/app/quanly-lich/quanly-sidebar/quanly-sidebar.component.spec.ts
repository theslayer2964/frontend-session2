import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlySidebarComponent } from './quanly-sidebar.component';

describe('QuanlySidebarComponent', () => {
  let component: QuanlySidebarComponent;
  let fixture: ComponentFixture<QuanlySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlySidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanlySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

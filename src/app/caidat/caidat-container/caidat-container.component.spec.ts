import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaidatContainerComponent } from './caidat-container.component';

describe('CaidatContainerComponent', () => {
  let component: CaidatContainerComponent;
  let fixture: ComponentFixture<CaidatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaidatContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaidatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

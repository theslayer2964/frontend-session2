import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiNhanComponent } from './loi-nhan.component';

describe('LoiNhanComponent', () => {
  let component: LoiNhanComponent;
  let fixture: ComponentFixture<LoiNhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoiNhanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetdetaiComponent } from './duyetdetai.component';

describe('DuyetdetaiComponent', () => {
  let component: DuyetdetaiComponent;
  let fixture: ComponentFixture<DuyetdetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuyetdetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuyetdetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeTaiGVComponent } from './dialog-de-tai-gv.component';

describe('DialogDeTaiGVComponent', () => {
  let component: DialogDeTaiGVComponent;
  let fixture: ComponentFixture<DialogDeTaiGVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeTaiGVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeTaiGVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

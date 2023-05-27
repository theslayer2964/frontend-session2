import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsGVChuaDuDeTaiComponent } from './ds-gvchua-du-de-tai.component';

describe('DsGVChuaDuDeTaiComponent', () => {
  let component: DsGVChuaDuDeTaiComponent;
  let fixture: ComponentFixture<DsGVChuaDuDeTaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsGVChuaDuDeTaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsGVChuaDuDeTaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

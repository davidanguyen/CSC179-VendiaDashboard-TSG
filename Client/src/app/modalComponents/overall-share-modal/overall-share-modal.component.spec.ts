import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallShareModalComponent } from './overall-share-modal.component';

describe('OverallShareModalComponent', () => {
  let component: OverallShareModalComponent;
  let fixture: ComponentFixture<OverallShareModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallShareModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

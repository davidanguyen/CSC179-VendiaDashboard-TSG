import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmplModalComponent } from './edit-empl-modal.component';

describe('EditEmplModalComponent', () => {
  let component: EditEmplModalComponent;
  let fixture: ComponentFixture<EditEmplModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmplModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmplModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

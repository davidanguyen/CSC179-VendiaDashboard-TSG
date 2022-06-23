import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmplModalComponent } from './add-empl-modal.component';

describe('AddEmplModalComponent', () => {
  let component: AddEmplModalComponent;
  let fixture: ComponentFixture<AddEmplModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmplModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmplModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

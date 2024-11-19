import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuestFormComponent } from './edit-guest-form.component';

describe('EditGuestFormComponent', () => {
  let component: EditGuestFormComponent;
  let fixture: ComponentFixture<EditGuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGuestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

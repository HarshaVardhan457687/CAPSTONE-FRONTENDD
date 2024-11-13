import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddListMenuComponent } from './add-list-menu.component';

describe('AddListMenuComponent', () => {
  let component: AddListMenuComponent;
  let fixture: ComponentFixture<AddListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button with text "+ Add New Task"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.add-task-btn').textContent).toContain('+ Add New Task');
  });
});

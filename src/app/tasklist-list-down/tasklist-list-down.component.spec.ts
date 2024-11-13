import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListListDownComponent } from './tasklist-list-down.component';

describe('TaskListListDownComponent', () => {
  let component: TaskListListDownComponent;
  let fixture: ComponentFixture<TaskListListDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListListDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListListDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title "Create a New Landing"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.task-title').textContent).toContain('Create a New Landing');
  });
});

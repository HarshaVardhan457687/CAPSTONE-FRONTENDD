import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task-item/Task.model';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent implements OnInit{
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  editedTask: any = {
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  isSubmitting: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const [startDate, startTime] = this.splitDateTime(this.task.startDateTime);
    const [endDate, endTime] = this.splitDateTime(this.task.endDateTime);

    this.editedTask = {
      name: this.task.name,
      description: this.task.description,
      status: this.task.status,
      startDate: this.formatDateForInput(startDate),
      endDate: this.formatDateForInput(endDate),
      startTime: startTime,
      endTime: endTime,
    };
  }

  private splitDateTime(dateTimeStr: string): [string, string] {
    const [date, time] = dateTimeStr.split(' ');
    return [date, time];
  }

  private formatDateForInput(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  private formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  closeForm(): void {
    this.close.emit();
  } 

  

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const updatedTask = new Task(
      this.task.id,
      this.editedTask.name,
      this.editedTask.description,
      this.editedTask.status,
      `${this.formatDate(this.editedTask.startDate)} ${this.editedTask.startTime}`,
      `${this.formatDate(this.editedTask.endDate)} ${this.editedTask.endTime}`, 
      this.task.eventId
    );

    this.taskService.updateTask(updatedTask).subscribe({
      next: (response) => {
        this.taskUpdated.emit(response);
        this.closeForm();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

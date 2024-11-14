import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../task-item/Task.model';
import { TaskService } from '../task.service';
import { EventService } from '../EventService';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent {@Output() close = new EventEmitter<void>();
  
  task: any = {
    name: '',
    description: '',
    status: 'PENDING',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    eventId: ''
  };

  isSubmitting: boolean = false;

  constructor(private taskService: TaskService) {}

  closeForm(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;


    const newTask = new Task(
      null,  
      this.task.name!,
      this.task.description!,
      'PENDING',
      this.task.startDate! + ' ' + this.task.startTime!,
      this.task.endDate! + ' ' + this.task.startTime!,
      this.task.eventId!
    );
    console.log(newTask)
    this.taskService.createTask(newTask).subscribe({
      next: (createdTask) => {
        console.log('Task created successfully:', createdTask);
        this.closeForm();
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

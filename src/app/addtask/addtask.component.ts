import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task-item/Task.model';
import { TaskService } from '../task.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input() eventId: any= null;
  task: any = {
    name: '',
    description: '',
    status: 'PENDING',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  isSubmitting: boolean = false;

  constructor(private taskService: TaskService, private eventService: EventService) {}

  closeForm(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    console.log(this.eventId)
    const newTask = new Task(
      null,  
      this.task.name!,
      this.task.description!,
      'PENDING',
      this.task.startDate! + ' ' + this.task.startTime!,
      this.task.endDate! + ' ' + this.task.startTime!,
      this.eventId!
    );
    console.log(newTask)
    this.taskService.createTask(newTask).subscribe({
      next: (createdTask) => {
        console.log('Task created successfully:', createdTask); 
        this.updateTotalTaskCount();
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

  updateTotalTaskCount(){
    if (!this.eventId) return;

    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        const completedTasks = event.taskCompleted || 0;
        const totalTasks = (event.totalTask || 0) + 1; 
        this.eventService.updateEventTasks(
          this.eventId!,
          completedTasks,
          totalTasks
        ).subscribe({
          next: () => {
            console.log('Task count updated successfully');
            this.closeForm(); 
          },
          error: (error) => {
            console.error('Error updating task count:', error);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      },
      error: (error) => {
        console.error('Error getting event details:', error);
        this.isSubmitting = false;
        this.closeForm(); 
      }
    });
  }

}

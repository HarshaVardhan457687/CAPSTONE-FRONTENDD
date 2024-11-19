import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './Task.model';
import { TaskService } from '../task.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task; 
  @Input() isEventCompleted: boolean = false; 
  @Output() statusChange = new EventEmitter<Task>();
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<Task>(); 

  constructor(private taskService: TaskService, private eventService: EventService){ 
    
  }  

  editTask() {
    this.taskEdit.emit(this.task); 
  }


  formatDateTime(dateTimeStr: string): Date {
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const fullYear = year.length === 4 ? year : `20${year}`;
    
    return new Date(
      parseInt(fullYear), 
      parseInt(month), 
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );
  } 
  

  toggleComplete() {
    if (!this.isEventCompleted) {
      this.task.status = this.task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      this.statusChange.emit(this.task);
    }
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(
      () => {
        this.updateEventTaskCount();
      
      },
      (error) => {
        console.error('Error deleting guest:', error);
      }
    );
  }  
  private updateEventTaskCount() {
    const eventId = this.task.eventId;
    
    if (!eventId) {
      console.error('No event ID found for task');
      return;
    }

    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        const totalTasks = Math.max(0, (event.totalTask || 0) - 1);
        

        let completedTasks = event.taskCompleted || 0;
        if (this.task.status === 'COMPLETED') {
          completedTasks = Math.max(0, completedTasks - 1);
        }

        this.eventService.updateEventTasks(
          eventId,
          completedTasks,
          totalTasks
        ).subscribe({
          next: () => {
            console.log('Task counts updated successfully');
          },
          error: (error) => {
            console.error('Error updating task counts:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error getting event details:', error);
      }
    });
  }
} 


import { Component, Input } from '@angular/core';
import { Task } from './Task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input()
  task!: Task; 

  constructor(){ 
    
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
    this.task.isCompleted();
  }

  editTask() {
    console.log('Editing task:', this.task.name);
  }

  deleteTask() {
    console.log('Deleting task:', this.task.name);
  }
} 


import { Component, OnInit } from '@angular/core';

import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Task } from '../task-item/Task.model';
import { EventService } from '../EventService';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  showForm: boolean = false;
  dropdownOpen: boolean = false;
  selectedEvent: string = '';
  events: any[] = []; // Replace 'any' with your Event interface/class
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadTasksForEvent("1");
  }

  

  loadTasksForEvent(eventId: string): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.getTasksByEventId(eventId)
      .pipe(
        catchError(error => {
          console.error('Error loading tasks:', error);
          this.error = 'Failed to load tasks. Please try again.';
          return of([]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(tasks => {
        this.tasks = tasks; 
        console.log(this.tasks)
      });
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  addTask(task: Task): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.createTask(task)
      .pipe(
        catchError(error => {
          console.error('Error creating task:', error);
          this.error = 'Failed to create task. Please try again.';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(newTask => {
        if (newTask) {
          this.tasks.push(newTask);
          this.closeForm();
        }
      });
  }

  updateTask(updatedTask: Task): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.updateTask(updatedTask)
      .pipe(
        catchError(error => {
          console.error('Error updating task:', error);
          this.error = 'Failed to update task. Please try again.';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(result => {
        if (result) {
          const index = this.tasks.findIndex(task => task.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        }
      });
  }

  deleteTask(taskId: string): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.deleteTask(taskId)
      .pipe(
        catchError(error => {
          console.error('Error deleting task:', error);
          this.error = 'Failed to delete task. Please try again.';
          return of(false);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(success => {
        if (success) {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        }
      });
  }

  // Optional: Method to update task status
  updateTaskStatus(taskId: string, newStatus: string): void {
    this.isLoading = true;
    this.error = null;

    this.taskService.updateTaskStatus(taskId, newStatus)
      .pipe(
        catchError(error => {
          console.error('Error updating task status:', error);
          this.error = 'Failed to update task status. Please try again.';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(updatedTask => {
        if (updatedTask) {
          const index = this.tasks.findIndex(task => task.id === taskId);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        }
      });
  }

  // Optional: Method to sort tasks by date
  sortTasksByDate(): void {
    this.tasks.sort((a, b) => {
      const dateA = new Date(`${a.startDateTime}`);
      const dateB = new Date(`${b.startDateTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  // Optional: Method to check if a task is overdue
  isTaskOverdue(task: Task): boolean {
    const taskEndDate = new Date(`${task.endDateTime}`);
    return taskEndDate < new Date() && task.status !== 'COMPLETED';
  }
}
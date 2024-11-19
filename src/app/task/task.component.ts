import { Component, OnInit } from '@angular/core';

import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Task } from '../task-item/Task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

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
  events: any[] = []; 
  isLoading: boolean = false;
  error: string | null = null; 
  eventId: string | null = null; 
  changedTasks: Set<Task> = new Set();
  hasChanges: boolean = false; 
  selectedTask: any = null

  constructor(
    private taskService: TaskService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {} 

  showEditForm = false;

  onTaskEdit(task: Task) { 
    
    this.selectedTask = task;
    this.showEditForm = true; 
    console.log(this.showEditForm)
  }

  closeEditForm() {
    this.showEditForm = false;
    this.selectedTask = null;
  }

  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId) {
        this.eventId
        this.loadTasksForEvent(this.eventId);
      }
    });
    
  } 

  goBack() {
    this.router.navigate(['/content/event']);
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

  onTaskStatusChange(task: Task) {
    this.changedTasks.add(task); 
    this.hasChanges = true; 
    console.log(this.changedTasks)
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

  sortTasksByDate(): void {
    this.tasks.sort((a, b) => {
      const dateA = new Date(`${a.startDateTime}`);
      const dateB = new Date(`${b.startDateTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  isTaskOverdue(task: Task): boolean {
    const taskEndDate = new Date(`${task.endDateTime}`);
    return taskEndDate < new Date() && task.status !== 'COMPLETED';
  } 
  async saveChanges() {
    if (!this.hasChanges) return;

    try {   
        console.log(this.changedTasks)
        const updatedTasks: Task[] = [];
        const updatePromises = Array.from(this.changedTasks).map(async task => {
            try {
                const updatedTask = await this.taskService.updateTaskStatus(task.id, task.status).toPromise();
                if (updatedTask) {
                    updatedTasks.push(updatedTask);
                }
                return updatedTask;
            } catch (error) {
                console.error(`Error updating task ${task.id}:`, error);
                throw error;
            }
        });

        await Promise.all(updatePromises);

        updatedTasks.forEach(updatedTask => {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
        });

        const completedTasks = this.tasks.filter(task => task.status === 'COMPLETED').length;
        const totalTasks = this.tasks.length;
        if (this.eventId) {
            await this.eventService.updateEventTasks(
                this.eventId,
                completedTasks,
                totalTasks
            ).toPromise();
        }
        this.changedTasks.clear();
        this.hasChanges = false;

        alert('Changes saved successfully!');
    } catch (error) {
        console.error('Error saving changes:', error);
      
        this.loadTasksForEvent(this.eventId!);
        
        alert('Error saving changes. Please try again.');
    }
  }

}
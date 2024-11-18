import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task-item/Task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `http://localhost:8096/tasks`;

  constructor(private http: HttpClient) {}

  getTasksByEventId(eventId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/event/${eventId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(taskId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${taskId}`);
  }

  updateTaskStatus(taskId: string, status: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}/${status}`);
  }
}
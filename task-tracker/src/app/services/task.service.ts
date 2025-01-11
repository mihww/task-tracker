import { Injectable } from '@angular/core';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../../status';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  baseURL = "https://tasksapi20240226164535.azurewebsites.net/api/Tasks";
  
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseURL).pipe(
      map(tasks => tasks.filter(task => this.isValidStatus(task.status)))
    );
  }
  
  addTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseURL, newTask, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task) {
    return this.httpClient.put<Task>(`${this.baseURL}/${task.id}`, task);
  }    

  deleteTask(task: Task) {
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`,{ headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  private isValidStatus(status: Status): boolean {
    // Define an array of valid status values from the enum
    const validStatuses = [Status.ToDo, Status.InProgress, Status.Done];
  
    // Check if the status is included in the validStatuses array
    return validStatuses.includes(status);
  }
}


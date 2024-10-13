import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/models/task.model'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http:localhost:4200'; 

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Add other methods (addTask, updateTask, deleteTask) as needed
}

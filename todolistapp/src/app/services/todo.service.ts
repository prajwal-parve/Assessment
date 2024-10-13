import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:4200/';  

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}todo`).pipe(
      catchError(this.handleError)
    );
  }

  addTodoItem(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}todo`, todo, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTodoById(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}todo/${id}`, todo, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}todo/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  editTodoById(id: number, updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, updatedTodo, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    
    console.error(`Error occurred: ${error.message}`);
    return throwError(() => new Error(`Error: ${error.message}`));
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/';  // Ensure this is the correct port for your API

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Fetch the list of Todos
  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}todo`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new Todo item
  addTodoItem(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}todo`, todo, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing Todo by ID
  updateTodoById(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}todo/${id}`, todo, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a Todo by ID
  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}todo/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Edit Todo by ID (ensure consistent URL)
  editTodoById(id: number, updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}todo/${id}`, updatedTodo, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from API calls
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Customize error handling logic
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);  // Log error to console
    return throwError(() => new Error(errorMessage)); // Propagate error
  }
}

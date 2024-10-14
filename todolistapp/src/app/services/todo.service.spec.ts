import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/todo.service';
import { Todo } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the testing module
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all Todos', () => {
    const mockTodos: Todo[] = [
      { isCompleted: false, userId: 1, id: 1, task: 'Test Todo 1' }, // Removed status
      { isCompleted: false, userId: 1, id: 2, task: 'Test Todo 2' }, // Removed status
    ];

    service.getTodoList().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('http://localhost:3000/todo'); // Match the request URL
    expect(req.request.method).toBe('GET'); // Ensure the request method is correct
    req.flush(mockTodos); // Respond with mock data
  });

  it('should add a new Todo', () => {
    const newTodo: Todo = { isCompleted: false, userId: 1, id: 3, task: 'New Todo' }; // Removed status

    service.addTodoItem(newTodo).subscribe(todo => {
      expect(todo).toEqual(newTodo);
    });

    const req = httpMock.expectOne('http://localhost:3000/todo'); // Match the request URL
    expect(req.request.method).toBe('POST'); // Ensure the request method is correct
    req.flush(newTodo); // Respond with mock data
  });

  it('should handle errors when retrieving Todos', () => {
    service.getTodoList().subscribe({
      next: () => fail('should have failed with a 404 error'),
      error: (error) => {
        expect(error.message).toContain('404'); // Check for error message
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/todo');
    req.error(new ErrorEvent('404')); // Simulate an error response
  });
});

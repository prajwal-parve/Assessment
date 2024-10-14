import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodolistComponent } from './todolist.component';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoService', ['getTodoList', 'addTodoItem', 'deleteTodoById', 'updateTodoById']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserService = jasmine.createSpyObj('UserService', ['getAccessToken']);

    await TestBed.configureTestingModule({
      imports: [TodolistComponent],
      providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todo items on init', () => {
    mockUserService.getAccessToken.and.returnValue({ id: 1 });
    const mockTodoList = [{ id: 1, task: 'Test Task', completed: false, userId: 1 }];
    mockTodoService.getTodoList.and.returnValue(of(mockTodoList));

    component.ngOnInit();

    expect(component.todo.length).toBe(1);
    expect(mockTodoService.getTodoList).toHaveBeenCalled();
  });

  it('should handle error when fetching todo items', () => {
    mockUserService.getAccessToken.and.returnValue({ id: 1 });
    const mockError = { status: 404, statusText: 'Not Found' };
    mockTodoService.getTodoList.and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.errorMsg).toBe('404 Not Found');
    expect(mockToastrService.error).toHaveBeenCalled();
  });

  it('should add a todo item', () => {
    const mockTodo = { id: 1, task: 'New Task', completed: false, userId: 1 };
    mockUserService.getAccessToken.and.returnValue({ id: 1 });
    mockTodoService.addTodoItem.and.returnValue(of(mockTodo));

    component.todoItemAdded({ id: 1, task: 'New Task' });

    expect(mockTodoService.addTodoItem).toHaveBeenCalledWith(jasmine.objectContaining({ task: 'New Task' }));
    expect(mockToastrService.success).toHaveBeenCalled();
  });

  it('should handle error when adding a todo item', () => {
    mockUserService.getAccessToken.and.returnValue({ id: 1 });
    const mockError = { status: 500, statusText: 'Server Error' };
    mockTodoService.addTodoItem.and.returnValue(throwError(mockError));

    component.todoItemAdded({ id: 1, task: 'New Task' });

    expect(mockToastrService.error).toHaveBeenCalled();
  });

  it('should delete a todo item', () => {
    const todoId = 1;
    mockTodoService.deleteTodoById.and.returnValue(of(null));

    component.onDeleteTodoItem(todoId);

    expect(mockTodoService.deleteTodoById).toHaveBeenCalledWith(todoId);
    expect(mockToastrService.success).toHaveBeenCalled();
  });

  it('should handle error when deleting a todo item', () => {
    const todoId = 1;
    const mockError = { status: 500, statusText: 'Server Error' };
    mockTodoService.deleteTodoById.and.returnValue(throwError(mockError));

    component.onDeleteTodoItem(todoId);

    expect(mockToastrService.error).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoitemsComponent } from './todoitems.component';
import { Todo } from 'src/app/shared/todo';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TodoitemsComponent', () => {
  let component: TodoitemsComponent;
  let fixture: ComponentFixture<TodoitemsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoitemsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update event when update is called', () => {
    const todo: Todo = {
      userId: '1',
      id: 1,
      task: 'Test Task',
      completed: false,
      status: false
    };
    spyOn(component.updateItem, 'emit');

    component.onUpdate(todo);
    expect(component.updateItem.emit).toHaveBeenCalledWith({
      userId: '1',
      id: 1,
      task: 'Test Task',
      completed: false,
      status: false
    });
  });

  it('should emit edit event when edit is called', () => {
    const todo: Todo = {
      userId: '1',
      id: 1,
      task: 'Test Task',
      completed: false,
      status: false
    };
    spyOn(component.editItem, 'emit');

    component.edit(todo);
    expect(component.editItem.emit).toHaveBeenCalledWith(todo);
  });

  it('should emit delete event when delete is called', () => {
    spyOn(component.deleteItem, 'emit');

    const todoId = 1;
    component.onDelete(todoId);
    expect(component.deleteItem.emit).toHaveBeenCalledWith(todoId);
  });

  it('should display the correct number of todo items', () => {
    const testTodos: Todo[] = [
      { userId: '1', id: 1, task: 'Test Task 1', completed: false, status: false },
      { userId: '1', id: 2, task: 'Test Task 2', completed: true, status: true },
    ];

    component.todolist = testTodos;
    fixture.detectChanges();

    const listItems = debugElement.queryAll(By.css('.list-group-item'));
    expect(listItems.length).toBe(testTodos.length);
  });
});

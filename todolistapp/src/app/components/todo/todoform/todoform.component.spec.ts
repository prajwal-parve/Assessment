import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoformComponent } from './todoform.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TodoformComponent', () => {
  let component: TodoformComponent;
  let fixture: ComponentFixture<TodoformComponent>;
  let mockUserId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoformComponent, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoformComponent);
    component = fixture.componentInstance;
    component.userId = mockUserId; // Set the userId input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit todoItemCreated event on valid submit', () => {
    spyOn(component.todoItemCreated, 'emit');

    component.tform.task = 'New Todo';
    component.onSubmit();

    expect(component.todoItemCreated.emit).toHaveBeenCalledWith({
      userId: mockUserId,
      id: 0,
      task: 'New Todo',
      isCompleted: false
    });
  });

  it('should emit todoItemEdited event on edit', () => {
    spyOn(component.todoItemEdited, 'emit');

    component.tform = { id: 1, userId: mockUserId, task: 'Edited Todo', isCompleted: false };
    component.edit();

    expect(component.todoItemEdited.emit).toHaveBeenCalledWith({
      userId: mockUserId,
      id: 1,
      task: 'Edited Todo',
      isCompleted: false
    });
  });

  it('should not emit events when task is empty', () => {
    spyOn(component.todoItemCreated, 'emit');
    spyOn(component.todoItemEdited, 'emit');

    component.tform.task = ''; // Set empty task

    component.onSubmit();
    component.edit();

    expect(component.todoItemCreated.emit).not.toHaveBeenCalled();
    expect(component.todoItemEdited.emit).not.toHaveBeenCalled();
  });

  it('should reset form after submission', () => {
    component.tform.task = 'New Todo';
    component.onSubmit();

    expect(component.tform.task).toBe('');
    expect(component.tform.id).toBe(0);
  });

  it('should reset form after edit', () => {
    component.tform = { id: 1, userId: mockUserId, task: 'Edit Todo', isCompleted: false };
    component.edit();

    expect(component.tform.task).toBe('');
    expect(component.tform.id).toBe(0);
  });
});

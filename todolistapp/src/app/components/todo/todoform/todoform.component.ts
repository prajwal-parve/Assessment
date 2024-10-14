import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/shared/todo';

@Component({
  selector: 'app-todoform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoformComponent implements OnInit {
  @ViewChild('task', { read: ElementRef }) el!: ElementRef<HTMLInputElement>;
  @Output() todoItemCreated = new EventEmitter<Todo>();
  @Output() todoItemEdited = new EventEmitter<Todo>();
  @Input() userId!: number; // To receive user ID from the parent component
  onSubmitValue: boolean = true;

  tform: Todo = {
    id: 0,
    userId: this.userId,
    task: '',
    completed: false,
    status: false
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.tform.task.trim()) {
      alert('Task cannot be empty'); // Simple validation feedback
      return;
    }

    this.el.nativeElement.focus();

    const newTodo: Todo = {
      userId: this.userId,
      id: this.tform.id,
      task: this.tform.task,
      completed: false,
      status: false
    };

    this.todoItemCreated.emit(newTodo);
    this.resetForm();
  }

  edit() {
    if (!this.tform.task.trim()) {
      alert('Task cannot be empty'); // Simple validation feedback
      return;
    }

    const editedTodo: Todo = {
      userId: this.tform.userId,
      id: this.tform.id,
      task: this.tform.task,
      completed: false,
      status: this.tform.status
    };

    this.todoItemEdited.emit(editedTodo);
    this.resetForm();
  }

  private resetForm() {
    this.tform = { id: 0, userId: this.userId, task: '', completed: false, status: false }; 
    this.el.nativeElement.focus(); // Focus back to the input after resetting
  }
}

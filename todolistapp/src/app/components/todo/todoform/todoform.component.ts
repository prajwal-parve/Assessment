import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() todoItemCreated = new EventEmitter<{ userId: number; id: number; task: string; status: boolean }>();
  @Output() todoItemEdited = new EventEmitter<{ userId: number; id: number; task: string; status: boolean }>();

  onSubmitValue: boolean = true;
  tform: { id: number; userId: number; task: string; status: boolean } = {
    id: 0,
    userId: 0,
    task: '',
    status: false
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    
    this.el.nativeElement.focus();

    const newTodo = {
      userId: this.tform.userId,
      id: this.tform.id,
      task: this.tform.task,
      status: this.tform.status
    };
    
    this.todoItemCreated.emit(newTodo);

    this.resetForm();
  }

  edit() {
    
    const editedTodo = {
      userId: this.tform.userId,
      id: this.tform.id,
      task: this.tform.task,
      status: this.tform.status
    };
    
    this.todoItemEdited.emit(editedTodo);

    this.resetForm();
  }

  private resetForm() {
    this.tform = { id: 0, userId: 0, task: '', status: false }; 
  }
}

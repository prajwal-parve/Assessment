import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/shared/todo';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todoitems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todoitems.component.html',
  styleUrls: ['./todoitems.component.css']
})
export class TodoitemsComponent implements OnInit {

  @Input() todolist: Todo[] = []; 
  @Output() updateItem = new EventEmitter<Todo>(); 
  @Output() deleteItem = new EventEmitter<number>(); 
  @Output() editItem = new EventEmitter<Todo>(); 

  tform: FormGroup; 
  onSubmitValue: boolean = true; 

  constructor(private fb: FormBuilder) {
    this.tform = this.fb.group({
      task: [''],
      id: [null]
    });
  }

  ngOnInit(): void {}

  onUpdate(todo: Todo) {
    this.updateItem.emit({ ...todo }); 
  }

  onEdit(todo: Todo) {
    this.editItem.emit(todo);
    this.tform.patchValue(todo); 
    this.onSubmitValue = false; 
  }

  onDelete(id: number) {
    console.log(`Deleting todo with id: ${id}`);
    this.deleteItem.emit(id);
  }

  
  onSubmit() {
    if (this.tform.valid) {
      const todoData = this.tform.value;
      if (todoData.id) {
        this.updateItem.emit(todoData);
      } else {
        this.editItem.emit(todoData); 
      }
      this.resetForm(); 
    }
  }

  
  resetForm() {
    this.tform.reset();
    this.onSubmitValue = true; 
  }
}

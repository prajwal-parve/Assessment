import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { Todo } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todoitems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todoitems.component.html',
  styleUrls: ['./todoitems.component.css']
})
export class TodoitemsComponent implements OnInit{

  @Input() todolist: Todo[] = [];
  @Output() updateItem = new EventEmitter<Todo>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() editItem = new EventEmitter<Todo>();

  constructor(){}


  ngOnInit(): void {
    
  }

  update(todo:Todo){
    this.updateItem.emit({userId:todo.userId, id:todo.id, task:todo.task, status:todo.status, completed: todo.completed});
  }

  edit(todo: Todo){
    this.editItem.emit(todo);
  }

  delete(id:number){
    console.log(id);
    this.deleteItem.emit(id);
  }

}

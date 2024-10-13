import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoformComponent } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todoform/todoform.component';
import { TodoService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/user.service';
import { Todo } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/shared/todo';
import { TodoitemsComponent } from "C:/Users/HP/Desktop/Assessment/todolistapp/src/app/components/todo/todoitems/todoitems.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TodoitemsComponent, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit{
  public fComp!:TodoformComponent;
  task!:string;
  todo!:Todo[];
  errorMsg:string="Loading Todo....";
  title:any="Todo List";
  today:number = Date.now();
  completeTask:any;
  pendingTask:any;
  userApi: any;


    constructor(private service:TodoService, private toastr:ToastrService, private router:Router,
      private userService:UserService, private route:ActivatedRoute, private _element:ElementRef){}

    ngOnInit(): void {
      console.log(this.userApi.getAccessToken().id);
      this.getItem();
    }

    getItem() {
      this.service.getTodoList().subscribe({
        next: (response) => {
          this.todo = response.filter(item => item.userId == this.userApi.getAccessToken().id);
          this.completeTask = this.todo.filter(item => item.completed === true);
          this.pendingTask = this.todo.filter(item => item.completed === false);
          console.log(this.completeTask);
        },
        error: (error) => {
          console.log(error);
          this.errorMsg = error.status + " " + error.statusText;
          if (error.status == 0) {
            this.router.navigate(['/network-error']);
          }
        }
      });
    }
    
// Adding a new todo item
todoItemAdded(todo: { id: number, task: string }) {
  const newTodo: Todo = {
    userId: this.userApi.getAccessToken().id,
    id: todo.id,
    task: todo.task,
    completed: false,
    status: false
  };

  this.service.addTodoItem(newTodo).subscribe({
    next: (todo: Todo) => {
      console.log(todo);
      this.toastr.success('Todo item has been added');
      this.getItem(); 
    },
    error: (err: any) => console.log(err)
  });
}

// Delete a todo item by ID
onDeleteTodoItem(id: number) {
  if (confirm("Are you sure?")) {
    this.service.deleteTodoById(id).subscribe({
      next: () => {
        console.log('Deleted');
        this.getItem(); 
        this.toastr.success('Todo item has been deleted');
      },
      error: (err: any) => console.log(err)
    });
  }
}

// Delete all completed tasks
onDeleteCompletedTask() {
  const completedTasks = this.todo.filter(item => item.completed === true);
  if (completedTasks.length <= 0) {
    this.toastr.success('No completed item found');
  } else if (confirm("Are you sure you want to delete completed tasks?")) {
    completedTasks.forEach(item => {
      if (item.id) {
        this.service.deleteTodoById(item.id).subscribe({
          next: () => {
            this.getItem(); 
            this.toastr.success('Todo item has been deleted.');
          },
          error: (err: any) => console.log(err)
        });
      }
    });
  }
}

// Update a todo item
onUpdateTodoItem(todo: Todo) {
  
  this.service.updateTodoById(todo.id, {
      userId: todo.userId,
      id: todo.id,
      task: todo.task,
      status: todo.status,
      completed: todo.completed 
  }).subscribe(
      response => {
          this.toastr.success("Todo item has been updated.");
          this.getItem(); 
      },
      err => console.log(err)
  );
}

//on edit
onEditItem(todo: Todo) {
  this.fComp.tform.task = todo.task;
  this.fComp.tform.id = todo.id;
  this.fComp.onSubmitValue = false;
  this.fComp.el.nativeElement.focus();
}

onEditTodoItem(todo: Todo) {
  this.service.editTodoById(todo.id, {
    userId: todo.userId,
    id: todo.id,
    task: todo.task,
    status: todo.status,
    completed: todo.completed
  }).subscribe({
    next: (res) => {
      this.toastr.success("Todo Item has been Updated.");
      this.getItem(); 
    },
    error: (err: any) => console.log(err) 
  });
}


}

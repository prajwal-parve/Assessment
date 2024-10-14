import { Component, OnInit, ElementRef } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Todo } from 'src/app/shared/todo';
import { TodoitemsComponent } from 'src/app/components/todo/todoitems/todoitems.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TodoitemsComponent, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  task!: string; 
  todo!: Todo[]; 
  errorMsg: string = "Loading Todo...."; 
  title: string = "Todo List"; 
  completeTask!: Todo[]; 
  pendingTask!: Todo[]; 
  fComp!: TodoitemsComponent; 

  constructor(
    private service: TodoService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private _element: ElementRef
  ) {}

  ngOnInit(): void {
    this.getItem(); 
  }

  getItem() {
    const userId = this.userService.getAccessToken()?.id; 

    
    if (userId === undefined) { 
      this.toastr.error('User not authenticated');
      this.router.navigate(['/login']);
      return;
    }

    
    this.service.getTodoList().subscribe({
      next: (response) => {
        
        this.todo = response.filter(item => item.userId === userId);
        this.completeTask = this.todo.filter(item => item.isCompleted === true);
        this.pendingTask = this.todo.filter(item => item.isCompleted === false);
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.errorMsg = error.status + " " + error.statusText;
        if (error.status === 0) {
          this.router.navigate(['/network-error']);
        }
      }
    });
  }

  
  todoItemAdded(todo: { id: number; task: string; }) {
    const userId = this.userService.getAccessToken()?.id; 
    const newTodo: Todo = {
      userId: userId, 
      id: todo.id,
      task: todo.task,
      isCompleted: false,
    };

    this.service.addTodoItem(newTodo).subscribe({
      next: (todo: Todo) => {
        this.toastr.success('Todo item has been added');
        this.getItem(); 
      },
      error: (err: any) => {
        console.error('Error adding todo:', err);
        this.toastr.error('Failed to add todo item');
      }
    });
  }

  
  onDeleteTodoItem(id: number) {
    if (confirm("Are you sure?")) {
      this.service.deleteTodoById(id).subscribe({
        next: () => {
          this.toastr.success('Todo item has been deleted');
          this.getItem(); 
        },
        error: (err: any) => {
          console.error('Error deleting todo:', err);
          this.toastr.error('Failed to delete todo item');
        }
      });
    }
  }

  
  onDeleteCompletedTask() {
    const completedTasks = this.todo.filter(item => item.isCompleted === true);
    if (completedTasks.length <= 0) {
      this.toastr.info('No completed item found');
    } else if (confirm("Are you sure you want to delete completed tasks?")) {
      completedTasks.forEach(item => {
        this.service.deleteTodoById(item.id!).subscribe({
          next: () => {
            this.toastr.success('Todo item has been deleted.');
            this.getItem(); // Refresh the todo list
          },
          error: (err: any) => {
            console.error('Error deleting completed todo:', err);
            this.toastr.error('Failed to delete todo item');
          }
        });
      });
    }
  }

 
  onUpdateTodoItem(todo: Todo) {
    this.service.updateTodoById(todo.id!, {
      userId: todo.userId,
      id: todo.id,
      task: todo.task,
      isCompleted: todo.isCompleted
    }).subscribe({
      next: () => {
        this.toastr.success("Todo item has been updated.");
        this.getItem(); 
      },
      error: (err: any) => {
        console.error('Error updating todo:', err);
        this.toastr.error('Failed to update todo item');
      }
    });
  }

 
  onEditItem(todo: Todo) {
    
    if (this.fComp) { 
      this.fComp.tform.task = todo.task; 
      this.fComp.tform.id = todo.id; 
      this.fComp.onSubmitValue = false; 
      this._element.nativeElement.querySelector('#taskInput').focus(); 
    }
  }

  
  onEditTodoItem(todo: Todo) {
    this.service.editTodoById(todo.id!, {
      userId: todo.userId,
      id: todo.id,
      task: todo.task,
      isCompleted: todo.isCompleted
    }).subscribe({
      next: () => {
        this.toastr.success("Todo Item has been Updated.");
        this.getItem(); 
      },
      error: (err: any) => {
        console.error('Error editing todo:', err);
        this.toastr.error('Failed to update todo item');
      }
    });
  }
}

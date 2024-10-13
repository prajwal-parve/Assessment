import { TestBed } from '@angular/core/testing';

import { TodoService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

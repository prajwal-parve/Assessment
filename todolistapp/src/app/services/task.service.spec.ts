import { TestBed } from '@angular/core/testing';
import { TaskService } from 'C:/Users/HP/Desktop/Assessment/todolistapp/src/app/services/task.service'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { TaskService } from './task.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskComponent } from './task.component';
import { Observable, of } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [TaskService]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('TaskService', () =>{
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [TaskService]
    });

    taskService = TestBed.get(TaskService); // Add this
  });

  it('Task Service should be created', () => {
    expect(taskService).toBeTruthy();
  });

  describe('getTask', () =>{
    it('should return task to edit', () =>{
      const dummyTask = [{ 
        Parent_ID: 1, 
        Project_ID: 1, 
        Task_Name : 'Task 1 ',
        Task_ID: 1,
        Start_Date: '',
        End_Date: '',
        Priority: 1,
        Status: 'Completed',
        User_ID: 1
       }];  

      let response;
      spyOn(taskService, 'getTask').and.returnValue(of(dummyTask));

      taskService.getTask(1).subscribe(res => {
        response = res;
      });

      expect(response).toEqual(dummyTask);

    });
  });
});
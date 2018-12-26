import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ViewTaskService } from './viewtask.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewtaskComponent } from './viewtask.component';
import { Observable, of } from 'rxjs';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;


  const dummyProject = [{ Project_Id: 1, Project_Name : 'Project 1'}];

  let dummyProjectService = {
    getAllProjects: () => {
      return of(dummyProject);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{provide: ViewTaskService, useValue: dummyProjectService}] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Projects should be populated', () => {
    component.ngOnInit();
    expect(component._projetToDisplay).toEqual(dummyProject);
  });
});

describe('ViewTaskService', () =>{
  let taskService: ViewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [ViewTaskService]
    });

    taskService = TestBed.get(ViewTaskService); // Add this
  });

  it('View Task Service should be created', () => {
    expect(taskService).toBeTruthy();
  });

  describe('getAllProjects', () =>{
    it('should return collection of Parent Tasks', () =>{
      const dummyProject = [{ Project_Id: 1, Project_Name : 'Project 1'}];  

      let response;
      spyOn(taskService, 'getAllProjects').and.returnValue(of(dummyProject));

      taskService.getAllProjects().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(dummyProject);

    });
  });
});
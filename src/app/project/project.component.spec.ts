import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [ProjectService]   
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ProjectService', () =>{
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [ProjectService]
    });

    projectService = TestBed.get(ProjectService); // Add this
  });

  it('Project Service should be created', () => {
    expect(projectService).toBeTruthy();
  });

  describe('getAllProjects', () =>{
    it('should return all projects to list', () =>{
      const dummyProjectList= [{  
        Project_Id: 1, 
        Start_Date: '',
        End_Date: '',
        Priority: 1,
        User_ID: 1,
        Project_Name: 'Project',
        Completed_Tasks: 2,
        Total_Tasks: 4
       }];  

      let response;
      spyOn(projectService, 'getAllProjects').and.returnValue(of(dummyProjectList));

      projectService.getAllProjects().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(dummyProjectList);

    });
  });
});
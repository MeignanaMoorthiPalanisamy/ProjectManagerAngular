import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { UserService } from './users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from './users.component';
import { Observable, of } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const dummyUser = [{ User_ID: 1, FirstName: 'First Name', LastName : 'Last Name',Employee_ID: '407957' }];

  let dummyUserService = {
    getUsers: () => {
      return of(dummyUser);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{provide:UserService,  useValue: dummyUserService}]  
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Users populated and validated', () => {
    component.ngOnInit();
    expect(component.filteredUsers).toEqual(dummyUser);
  });
});

describe('UserService', () =>{
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [UserService]
    });

    userService = TestBed.get(UserService); // Add this
  });

  it('User Service should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('getUsers', () =>{
    it('should return collection of User', () =>{
      const dummyUser = [{ User_ID: 1, FirstName: 'First Name', LastName : 'Last Name',Employee_ID: '407957' }];  

      let response;
      spyOn(userService, 'getUsers').and.returnValue(of(dummyUser));

      userService.getUsers().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(dummyUser);

    });
  });
});

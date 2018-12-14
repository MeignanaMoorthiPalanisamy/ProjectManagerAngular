import { Component, OnInit } from '@angular/core';

import { IUser, IUserCreate } from './user';
import { UserService } from './users.service';
import { isBuffer } from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  filteredUsers: IUser[] = [];
  users: IUser[] = [];
  errorMessage: string;
  _firstName: string;
  _lastName: string;
  _employeeID: string;
  _editId: number;
  isInsert: boolean = true;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  sortByFirstName(): void {
    this.filteredUsers = this.users.sort(
      function (o1, o2) {
        var firstName1 = o1.FirstName;
        var firstName2 = o2.FirstName;
        if (firstName1 < firstName2)
          return -1;
        if (firstName1 > firstName2)
          return 1;
        return 0;
      }
    );
  }

  sortByLastName(): void {
    this.filteredUsers = this.users.sort(
      function (o1, o2) {
        var lastName1 = o1.LastName;
        var lastName2 = o2.LastName;
        if (lastName1 < lastName2)
          return -1;
        if (lastName1 > lastName2)
          return 1;
        return 0;
      }
    );
  }

  sortById(): void {
    this.filteredUsers = this.users.sort(
      function (o1, o2) {
        var id1 = o1.Employee_ID;
        var id2 = o2.Employee_ID;
        if (id1 < id2)
          return -1;
        if (id1 > id2 )
          return 1;
        return 0;
      }
    );
  }

  constructor(private userService: UserService) { }

  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: IUser) => user.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1
      || user.LastName.toLocaleLowerCase().indexOf(filterBy) !== -1
      || user.Employee_ID.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  resetUser(): void {
    this._employeeID = '';
    this._firstName = '';
    this._lastName = '';
    this.isInsert = true;
  }

  editUser(userEdit): void {
    this._employeeID = userEdit.Employee_ID;
    this._firstName = userEdit.FirstName;
    this._lastName = userEdit.LastName;
    this._editId = userEdit.User_ID;
    this.isInsert = false;
  }

  addUser(): void {
    let userDetail = {
      Employee_ID: this._employeeID,
      FirstName: this._firstName,
      LastName: this._lastName,
    };
    this.userService.insertUser(userDetail).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error,
      () => {
        this.userService.getUsers().subscribe(
          users => {
            this.users = users;
            this.filteredUsers = this.users;
          },
          error => this.errorMessage = <any>error
        );
      }
    );
  }

  updateUser(): void {
    let userDetail = {
      Employee_ID: this._employeeID,
      FirstName: this._firstName,
      LastName: this._lastName,
      User_ID: this._editId
    };

    this.userService.updateUser(userDetail).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error,
      () => {
        this.userService.getUsers().subscribe(
          users => {
            this.users = users;
            this.filteredUsers = this.users;
          },
          error => this.errorMessage = <any>error,
          () => {
            this.resetUser();
            this.isInsert = true;
          }
        );
      }
    );
  }

  deleteUser(userEdit): void {
    this.userService.deleteUser(userEdit.User_ID).subscribe(
      data => {
        console.log(data);
      },
      error => this.errorMessage = <any>error,
      () => {
        this.userService.getUsers().subscribe(
          users => {
            this.users = users;
            this.filteredUsers = this.users;
          },
          error => this.errorMessage = <any>error
        );
      }
    );
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error => this.errorMessage = <any>error
    );
  }

}

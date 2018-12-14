import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IUserDetail, IDisplayProjectDetail } from './project';
import { ProjectService } from './project.service'

declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private datePipe: DatePipe, private projectService: ProjectService) { }

  isInsert: boolean = true;
  errorMessage: string;
  _projectName: string;
  _isDateEnabled = false;
  _dateCheckbox: boolean;
  _fromDate: string = null;
  _endDate: string = null;
  _dateError: any = { isError: false, errorMessage: '' };
  _priority: number;
  _usersToDisplay: IUserDetail[] = [];
  _selectedProjectManagerId: number;
  _selectedProjectManager: string;
  filteredProjects: IDisplayProjectDetail[] = [];
  projects: IDisplayProjectDetail[] = [];
  _projectIdToEdit: number;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projects;
  }


  manipulateDate(): void {
    this._isDateEnabled = this._dateCheckbox;
    if (this._dateCheckbox) {
      var date = new Date();
      var enddate = new Date();
      enddate.setDate(date.getDate() + 1);
      this._fromDate = this.datePipe.transform(date, "yyyy-MM-dd");
      this._endDate = this.datePipe.transform(enddate, "yyyy-MM-dd");
    }
    else {
      this._fromDate = '';
      this._endDate = '';
      this._dateError = { isError: false, errorMessage: '' };
    }
  }

  compareDates(): void {
    if (this._isDateEnabled) {
      if (this._fromDate.length == 0) {
        this._dateError = { isError: true, errorMessage: 'Both Start Date and End Date are required!' };
      }
      else if (this._endDate.length == 0) {
        this._dateError = { isError: true, errorMessage: 'Both Start Date and End Date are required!' };
      }
      else {
        this._dateError = { isError: false, errorMessage: '' };
      }
    }
    if (this._fromDate.length > 0 && this._endDate.length > 0) {
      if (new Date(this._fromDate) > new Date(this._endDate)) {
        this._dateError = { isError: true, errorMessage: 'End Date can not before start date' };
      }
      else {
        this._dateError = { isError: false, errorMessage: '' };
      }
    }
  }

  openModal(): void {
    $("#myModal").modal("show");
    $("#projectManagerId").chosen();
  }
  ngOnInit() {
    this.projectService.getUsers().subscribe(
      users => {
        this._usersToDisplay = users;
      },
      error => this.errorMessage = <any>error
    );

    this.projectService.getAllProjects().subscribe(
      projects => {
        this.projects = projects;
        this.filteredProjects = this.projects;
      },
      error => this.errorMessage = <any>error
    );
  }

  editProject(project): void {
    this.isInsert = false;
    if (project.StartDate != null || project.EndDate != null) {
      this._isDateEnabled = true;
      this._fromDate = this.datePipe.transform(project.StartDate, "yyyy-MM-dd");
      this._endDate = this.datePipe.transform(project.EndDate, "yyyy-MM-dd");
      $('#dateCheckBox').prop('checked', true);
    }
    else {
      this._isDateEnabled = false;
      this._fromDate = null;
      this._endDate = null;
      $('#dateCheckBox').prop('checked', false);
    }
    this._projectName = project.Project_Name;
    this._projectIdToEdit = project.Project_Id;
    this._priority = project.Priority;
    this._selectedProjectManagerId = project.User_ID;
    $('#priorityId').val(project.Priority);
    var editableUser = this._usersToDisplay.find(x => x.User_ID == project.User_ID);
    if (editableUser != undefined)
      this._selectedProjectManager = editableUser.FirstName + "," + editableUser.LastName + "(" + editableUser.Employee_ID + ")";
  }

  closeModal(): void {
    this._selectedProjectManagerId = $("#projectManagerId").val();
    this._selectedProjectManager = $("#projectManagerId  option:selected").text();
  }

  resetProject(): void {
    this._projectName = '';
    this._dateCheckbox = false;
    this._fromDate = null;
    this._endDate = null;
    this._selectedProjectManagerId = 0;
    this._selectedProjectManager = '';
    this._priority = 0;
    $('#priorityId').val(0);
    this.isInsert = true;
  }

  performFilter(filterBy: string): IDisplayProjectDetail[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projects.filter((user: IDisplayProjectDetail) => user.Project_Name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  sortByStartDate(): void {
    this.filteredProjects = this.projects.sort(
      function (o1, o2) {
        var startDate1 = new Date(o1.StartDate);
        var startDate2 = new Date(o2.StartDate);
        if (startDate1 < startDate2)
          return -1;
        if (startDate1 > startDate2)
          return 1;
        return 0;
      }
    );
  }

  sortByEndDate(): void {
    this.filteredProjects = this.projects.sort(
      function (o1, o2) {
        var endDate1 = new Date(o1.EndDate);
        var endDate2 = new Date(o2.EndDate);
        if (endDate1 < endDate2)
          return -1;
        if (endDate1 > endDate2)
          return 1;
        return 0;
      }
    );
  }
  sortByPriority(): void {
    this.filteredProjects = this.projects.sort(
      function (o1, o2) {
        var priority1 = o1.Priority;
        var priority2 = o2.Priority;
        if (priority1 < priority2)
          return -1;
        if (priority1 > priority2)
          return 1;
        return 0;
      }
    );
  }


  //Service calls
  insertProject(): void {
    let projectDetail = {
      Project_Name: this._projectName,
      StartDate: this._fromDate,
      EndDate: this._endDate,
      Priority: this._priority,
      User_ID: this._selectedProjectManagerId
    };
    this.errorMessage = '';
    this.projectService.insertProject(projectDetail).subscribe(
      data => {

      },
      error => this.errorMessage = <any>error,
      () => {
        this.projectService.getAllProjects().subscribe(
          projects => {
            this.projects = projects;
            this.filteredProjects = this.projects;
          },
          error => this.errorMessage = <any>error          
        );
      }
    );
  }

  updateProject(): void {
    let projectDetail = {
      Project_Name: this._projectName,
      StartDate: this._fromDate,
      EndDate: this._endDate,
      Priority: this._priority,
      User_ID: this._selectedProjectManagerId,
      Project_Id: this._projectIdToEdit
    };
    console.log(projectDetail);
    this.errorMessage = '';
    this.projectService.updateProject(projectDetail).subscribe(
      data => {
      },
      error => this.errorMessage = <any>error,
      () => {
        this.projectService.getAllProjects().subscribe(
          projects => {
            this.projects = projects;
            this.filteredProjects = this.projects;
          },
          error => this.errorMessage = <any>error,
          () => {
            this.resetProject();
            this.isInsert = true;
          }
        );
      }
    );
  }

}

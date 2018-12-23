import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IUserDetail, IDisplayProjectDetail, IDisplayParentTaskDetail, IEditTask } from './task';
import { TaskService } from './task.service'
import { viewEngine_ChangeDetectorRef_interface } from '@angular/core/src/render3/view_ref';
import { ActivatedRoute } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  isInsert: boolean = true;
  errorMessage: string;
  _selectedProjectId: number;
  _selectedProjectName: string;
  _taskName: string;
  _isParentTask: boolean = false;
  _selectedParentTaskId: number;
  _selectedParentTaskName: string;
  _fromDate: string = null;
  _endDate: string = null;
  _dateError: any = { isError: false, errorMessage: '' };
  _priority: number;
  _selectedUserId: number;
  _selectedUserName: string;
  _usersToDisplay: IUserDetail[] = [];
  _projetToDisplay: IDisplayProjectDetail[] = [];
  _parentTaskToDisplay: IDisplayParentTaskDetail[] = [];
  _selectedStatus: string;
  _editTaskId: string;
  _isEdit: boolean = false;
  _tasksToEdit: IEditTask[] = [];

  constructor(private datePipe: DatePipe, private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {

    this._editTaskId = this.route.snapshot.paramMap.get("id");

    if (this._editTaskId != null || this._editTaskId != undefined) {
      this._isEdit = true;
      this.isInsert = false;

    }
    else {
      this._isEdit = false;
      this.isInsert = true;

    }

    if (!this._isEdit) {
      this.initializeDate();
      this._selectedStatus = 'Not Started';
    }

    this.taskService.getUsers().subscribe(
      users => {
        this._usersToDisplay = users;
      },
      error => this.errorMessage = <any>error,
      () => {
        if (this._isEdit) {
          this.getTask();
        }
      }
    );

    this.taskService.getAllProjects().subscribe(
      projects => {
        this._projetToDisplay = projects;
      },
      error => this.errorMessage = <any>error,
      () => {
        if (this._isEdit) {
          this.getTask();
        }
      }
    );

    this.taskService.getAllParentTasks().subscribe(
      parentTasks => {
        this._parentTaskToDisplay = parentTasks;
      },
      error => this.errorMessage = <any>error,
      () => {
        if (this._isEdit) {
          this.getTask();
        }
      }
    );
  }

  getTask(): void {
    if (this._isEdit) {
      this.taskService.getTask(this._editTaskId).subscribe(
        tasks => {
          this._tasksToEdit = tasks;
        },
        error => this.errorMessage = <any>error,
        () => {
          this._selectedParentTaskId = this._tasksToEdit[0].Parent_ID;
          this._selectedProjectId = this._tasksToEdit[0].Project_ID;
          this._taskName = this._tasksToEdit[0].Task_Name;
          this._fromDate = this.datePipe.transform(this._tasksToEdit[0].Start_Date, "yyyy-MM-dd");
          this._endDate = this.datePipe.transform(this._tasksToEdit[0].End_Date, "yyyy-MM-dd");
          this._priority = this._tasksToEdit[0].Priority;
          $('#priorityId').val(this._priority);
          this._selectedStatus = this._tasksToEdit[0].Status;
          this._selectedUserId = this._tasksToEdit[0].User_ID;
          var selectedParenttask = this._parentTaskToDisplay.find(x => x.Parent_ID == this._selectedParentTaskId);
          if (selectedParenttask != undefined) {
            this._selectedParentTaskName = selectedParenttask.Parent_Task_Name;
          }

          var selectedProjcetName = this._projetToDisplay.find(x => x.Project_Id == this._selectedProjectId);
          if (selectedProjcetName != undefined) {
            this._selectedProjectName = selectedProjcetName.Project_Name;
          }

          var selectedUser = this._usersToDisplay.find(x => x.User_ID == this._selectedUserId);
          if (selectedUser != undefined) {
            this._selectedUserName = selectedUser.FirstName + "," + selectedUser.LastName + "(" + selectedUser.Employee_ID + ")";
          }
          else {
            this._selectedUserName = '';
          }
        }
      );
    }
  }

  ParentTaskValidation(): void {
    if (this._isParentTask) {
      this._priority = 0;
      $('#priorityId').val(this._priority);
      this._selectedParentTaskId = 0;
      this._selectedParentTaskName = '';
      this._fromDate = '';
      this._endDate = '';
      this._selectedUserId = 0;
      this._selectedUserName = '';
      this._selectedStatus = 'Not started';
      this._dateError = { isError: false, errorMessage: '' };
      this._selectedProjectId = 0;
      this._selectedProjectName = '';
    }
    else {
      this.initializeDate();
    }
  }

  resetTask(): void {
    this._priority = 0;
    this._selectedParentTaskId = 0;
    this._selectedParentTaskName = '';
    this._fromDate = '';
    this._endDate = '';
    this._selectedUserId = 0;
    this._selectedUserName = '';
    this._selectedStatus = 'Not started';
    this._isParentTask = false;
    this._selectedProjectId = 0;
    this._selectedProjectName = '';
    $('#success-alert').hide();
    this._taskName = '';
    this.initializeDate();
    this._dateError = { isError: false, errorMessage: '' };
    $('#priorityId').val(this._priority);
  }

  closeAlert(): void {
    $('#success-alert').hide();
  }
  initializeDate(): void {
    var date = new Date();
    var enddate = new Date();
    enddate.setDate(date.getDate() + 0);
    this._fromDate = this.datePipe.transform(date, "yyyy-MM-dd");
    this._endDate = this.datePipe.transform(enddate, "yyyy-MM-dd");
  }
  compareDates(): void {
    if (!this._isParentTask) {
      if (this._fromDate.length == 0) {
        this._dateError = { isError: true, errorMessage: 'Both Start Date and End Date are required!' };
      }
      else if (this._endDate.length == 0) {
        this._dateError = { isError: true, errorMessage: 'Both Start Date and End Date are required!' };
      }
      else {
        this._dateError = { isError: false, errorMessage: '' };
      }

      if (this._fromDate.length == 0 && this._endDate.length == 0) {
        this._dateError = { isError: false, errorMessage: '' };
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
  }

  openProjectModal(): void {
    $("#projectModal").modal("show");
    $("#projectId").chosen();
  }

  selectProjectFromModal(): void {
    this._selectedProjectId = $("#projectId").val();
    this._selectedProjectName = $("#projectId  option:selected").text();
  }

  openUserModal(): void {
    $("#userModal").modal("show");
    $("#userId").chosen();
  }

  selectUserFromModal(): void {
    this._selectedUserId = $("#userId").val();
    this._selectedUserName = $("#userId  option:selected").text();
  }

  openParentTaskModal(): void {
    $("#parentTaskModal").modal("show");
    $("#parentTaskId").chosen();
  }

  selectParentTaskFromModal(): void {
    this._selectedParentTaskId = $("#parentTaskId").val();
    this._selectedParentTaskName = $("#parentTaskId  option:selected").text();
  }

  insertTask(): void {
    if (this._isParentTask) {
      let parentTaskDetail = {
        Parent_Task_Name: this._taskName,
        Parent_ID: 0
      }
      this.taskService.insertParentTask(parentTaskDetail).subscribe(
        data => {
        },
        error => this.errorMessage = <any>error,
        () => {
          $('#success-alert').show();
        }
      );
    }
    else {
      let taskDetail = {
        Parent_ID: this._selectedParentTaskId,
        Project_ID: this._selectedProjectId,
        Task_Name: this._taskName,
        Start_Date: this._fromDate,
        End_Date: this._endDate,
        Priority: this._priority,
        Status: this._selectedStatus,
        User_ID: this._selectedUserId
      }
      this.taskService.insertTask(taskDetail).subscribe(
        data => {
        },
        error => this.errorMessage = <any>error,
        () => {
          $('#success-alert').show();
        }
      );
    }
  }

  updateTask(): void {
    let taskDetail = {
      Parent_ID: this._selectedParentTaskId,
      Project_ID: this._selectedProjectId,
      Task_Name: this._taskName,
      Start_Date: this._fromDate,
      End_Date: this._endDate,
      Priority: this._priority,
      Status: this._selectedStatus,
      User_ID: this._selectedUserId,
      Task_ID: +this._editTaskId
    }
    this.taskService.updateTask(taskDetail).subscribe(
      data => {
      },
      error => this.errorMessage = <any>error,
      () => {
        $('#success-alert').show();
      }
    );
  }
}

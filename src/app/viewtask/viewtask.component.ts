import { Component, OnInit } from '@angular/core';
import { ViewTaskService } from './viewtask.service'
import { IDisplayTask, IDisplayProjectDetail } from './viewtask';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {


  _selectedProjectId: number;
  _selectedProjectName: string;
  _projetToDisplay: IDisplayProjectDetail[] = [];
  errorMessage: string;
  filteredTasks: IDisplayTask[] = [];
  tasks: IDisplayTask[] = [];
  

  constructor(private viewTaskService: ViewTaskService, private router: Router) { }

  ngOnInit() {
    this.viewTaskService.getAllProjects().subscribe(
      projects => {
        this._projetToDisplay = projects;
      },
      error => this.errorMessage = <any>error
    );
  }

  openProjectModal(): void {
    $("#projectModal").modal("show");
    $("#projectId").chosen();
  }

  selectProjectFromModal(): void {
    this._selectedProjectId = $("#projectId").val();
    this._selectedProjectName = $("#projectId  option:selected").text();
    if (this._selectedProjectId != null || this._selectedProjectId != undefined) {
      this.viewTaskService.getAllTasks(this._selectedProjectId).subscribe(
        task => {
          this.tasks = task;
          this.filteredTasks = this.tasks;
        },
        error => this.errorMessage = <any>error
      );
    }
  }

  sortByStartDate(): void {
    this.filteredTasks = this.tasks.sort(
      function (o1, o2) {
        var startDate1 = new Date(o1.Start_Date);
        var startDate2 = new Date(o2.Start_Date);
        if (startDate1 < startDate2)
          return -1;
        if (startDate1 > startDate2)
          return 1;
        return 0;
      }
    );
  }

  sortByEndDate(): void {
    this.filteredTasks = this.tasks.sort(
      function (o1, o2) {
        var endDate1 = new Date(o1.End_Date);
        var endDate2 = new Date(o2.End_Date);
        if (endDate1 < endDate2)
          return -1;
        if (endDate1 > endDate2)
          return 1;
        return 0;
      }
    );
  }
  sortByPriority(): void {
    this.filteredTasks = this.tasks.sort(
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
  sortByStatus(): void {
    this.filteredTasks = this.tasks.sort(
      function (o1, o2) {
        var status1 = o1.Status;
        var stauts2 = o2.Status;
        if (status1 < stauts2)
          return -1;
        if (status1 > stauts2)
          return 1;
        return 0;
      }
    );
  }

  changeStatus(task): void {
    this.errorMessage = '';
    this.viewTaskService.updateTask(task).subscribe(
      data => {
      },
      error => this.errorMessage = <any>error,
      () => {
        if (this._selectedProjectId != null || this._selectedProjectId != undefined) {
          this.viewTaskService.getAllTasks(this._selectedProjectId).subscribe(
            task => {
              this.tasks = task;
              this.filteredTasks = this.tasks;
            },
            error => this.errorMessage = <any>error
          );
        }
      }
    );
  }

  editTask(task): void{
    this.router.navigateByUrl('/task/' + task.Task_ID);
  }
}

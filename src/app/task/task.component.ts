import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  errorMessage: string;
  _selectedProjectId: number;
  _selectedProjectName: string;
  _taskName: string;
  _isParentTask: boolean;
  _selectedParentTaskId: number;
  _selectedParentTaskName: string;
  _fromDate: string = null;
  _endDate: string = null;
  _dateError: any = { isError: false, errorMessage: '' };
  _priority: number;
  _selectedUserId: number;
  _selectedUserName: string;
  
  constructor() { }

  ngOnInit() {
  }

}

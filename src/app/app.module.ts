import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './users/users.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProjectComponent,
    TaskComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', component: UsersComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'viewtasks', component: ViewtaskComponent },
      { path: 'task/:id', component: TaskComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])],
  providers: [UserService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

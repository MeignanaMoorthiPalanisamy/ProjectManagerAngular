import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { IUserDetail, IDisplayProjectDetail, IDisplayParentTaskDetail, ICreateTask, IEditTask } from './task';
import { IDisplayTask } from '../viewtask/viewtask';

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    private userUrl = 'http://localhost:4747/api/User';
    private projectUrl = 'http://localhost:4747/api/Projects';
    private parentTaskUrl = 'http://localhost:4747/api/ParentTask';
    private taskUrl = 'http://localhost:4747/api/Tasks';


    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUserDetail[]> {
        return this.http.get<IUserDetail[]>(this.userUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllProjects(): Observable<IDisplayProjectDetail[]> {
        return this.http.get<IDisplayProjectDetail[]>(this.projectUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    getAllParentTasks(): Observable<IDisplayParentTaskDetail[]> {
        return this.http.get<IDisplayParentTaskDetail[]>(this.parentTaskUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    insertParentTask(parentTaskObject: IDisplayParentTaskDetail): Observable<any> {
        return this.http.post<any>(this.parentTaskUrl, parentTaskObject);
    }

    insertTask(taskObject: ICreateTask): Observable<any> {
        return this.http.post<any>(this.taskUrl, taskObject);
    }

    getTask(taskID): Observable<IEditTask[]>{
        return this.http.get<IEditTask[]>(this.taskUrl + '/' + taskID ).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    updateTask(taskObject: IEditTask): Observable<any> {
        return this.http.put<any>(this.taskUrl + '/' + taskObject.Task_ID , taskObject);
    }
    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
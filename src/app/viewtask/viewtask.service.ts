import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { IDisplayTask, IDisplayProjectDetail } from './viewtask';

@Injectable({
    providedIn: 'root'
})

export class ViewTaskService {

    constructor(private http: HttpClient) { }

    private projectUrl = 'http://localhost:56755/api/Projects';
    private viewTaskUrl = 'http://localhost:56755/api/TaskList/';
    private updateViewUrl = 'http://localhost:56755/api/Tasks/';

    getAllProjects(): Observable<IDisplayProjectDetail[]> {
        return this.http.get<IDisplayProjectDetail[]>(this.projectUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllTasks(projectID: number ): Observable<IDisplayTask[]> {
        return this.http.get<IDisplayTask[]>(this.viewTaskUrl + projectID).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    updateTask(taskObject: IDisplayTask): Observable<any> {
        return this.http.delete<any>(this.updateViewUrl + taskObject.Task_ID);
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
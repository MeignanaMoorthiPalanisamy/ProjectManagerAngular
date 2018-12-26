import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUserDetail, ICreateProjectDetail, IDisplayProjectDetail } from './project';

@Injectable({
    providedIn: 'root'
})

export class ProjectService {

    private userUrl = 'http://localhost:56755/api/User';
    private projectUrl = 'http://localhost:56755/api/Projects';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUserDetail[]> {
        return this.http.get<IUserDetail[]>(this.userUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    insertProject(projectObject: ICreateProjectDetail): Observable<any> {
        return this.http.post<any>(this.projectUrl, projectObject);
    }

    updateProject(projectObject: IDisplayProjectDetail): Observable<any> {
        return this.http.put<any>(this.projectUrl + '/' + projectObject.Project_Id, projectObject);
    }

    getAllProjects(): Observable<IDisplayProjectDetail[]> {
        return this.http.get<IDisplayProjectDetail[]>(this.projectUrl);
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

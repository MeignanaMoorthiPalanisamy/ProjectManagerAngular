import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUser, IUserCreate } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'http://localhost:4747/api/User';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.userUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getUser(id: number): Observable<IUser | undefined> {
        return this.getUsers().pipe(
            map((users: IUser[]) => users.find(p => p.User_ID === id))
        );
    }

    insertUser(userObject: IUserCreate): Observable<any> {
        return this.http.post<any>(this.userUrl, userObject);
    }

    updateUser(userObject: IUser): Observable<any> {
        return this.http.put<any>(this.userUrl + '/' + userObject.User_ID, userObject);
    }

    deleteUser(userId: number): Observable<any> {
        return this.http.delete<any>(this.userUrl + '/' + userId);
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

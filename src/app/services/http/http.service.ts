import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces/employee.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  /**
   * make te api call to login user
   * @param user data of the user
   * @returns Observable with the response
   */
  logInUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get<any>('api/users')
      .pipe(catchError(this.handleError));
  }

  /**
   * make te api call to get the employees  list
   * @returns Observable with the response
   */
   getEmployes(): Observable<Employee[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get<any>('api/employees')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'There was an error on the client side:',
        error.error.message
      );
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Error, try later :(.');
  }
}

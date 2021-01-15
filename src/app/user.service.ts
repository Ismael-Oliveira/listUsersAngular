import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { User } from './user';
// import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // servidor remoto com api em java spring
  // private userUrl = 'http://localhost:8080/users';

  // Servidor local com json-server
  private userUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  getUsers(): Observable<User[]> {
    
    this.messageService.add("UserService: fetched users");
      return this.http.get<User[]>(this.userUrl)
                .pipe(
                  tap(_=>this.log('fetched users')),
                  catchError(this.handleError<User[]>('getUsers',[]))
                );
  }

  getUser(id: string): Observable<User> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, JSON.stringify(user), this.httpOptions)
                .pipe(
                  catchError(this.handleError)
                );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

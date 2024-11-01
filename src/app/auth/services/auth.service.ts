import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;
  constructor(private http: HttpClient) { }
  getCurrentUser(): User | undefined {
    if (!this.user) return undefined;
    // return {...this.user} estaria bien  pero es para cuando no tiene muchos objetos anidados sino
    return structuredClone(this.user);
  }
  setUser(user: User) {
    this.user = user;
  }
  login(email: string, password: string): Observable<User>  {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.setUser(user)),
      tap(user=>localStorage.setItem('Token', 'dedrewfergtreger.gregertewdegre.gfretewfew'))
    )
  }
  checkAuthentication():Observable<boolean> {
    if(!localStorage.getItem('Token')) return of (false)
      const token=localStorage.getItem('Token');
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user=>this.user=user),
      map(user=> !!user),
      catchError(err=> of (false))
    )
      return of (true)
  }
}

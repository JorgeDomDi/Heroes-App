
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
private baseUrl:string=environments.baseUrl;
  constructor(private http:HttpClient) { }


  public getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);

  }
  public getHeroById(id:string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(error=> of (undefined))
    );

  }
  getSuggestions(q:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${q}&_limit=6`)
  }
}

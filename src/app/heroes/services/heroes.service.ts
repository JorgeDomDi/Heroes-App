
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
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
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero)
    
  }
  updateHero(hero:Hero):Observable<Hero>{
    if(!hero.id)  throw Error ("Hero.id id required")
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
    
  }
  replaceHero(hero:Hero):Observable<Hero>{
    if(!hero.id)  throw Error ("Hero.id id required")
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
    
  }
  deleteHero(id:string):Observable<boolean>{
    if(!id)  throw Error ("Hero.id id required")
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
  
  catchError  (error => of (false) ),
map(resp => true)
)
    
  }
}

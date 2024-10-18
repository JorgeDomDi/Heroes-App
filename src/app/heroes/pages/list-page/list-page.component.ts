import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit{
heroes:Hero[]=[]
  constructor(private heroeService:HeroesService){

   
  }
  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(heroes=>this.heroes=heroes)
  
    
  }
}

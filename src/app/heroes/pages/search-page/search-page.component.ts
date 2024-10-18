import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

public searchInput=new FormControl('')
public heroes:Hero[]=[]


 
  constructor(private heroeService:HeroesService,private router:Router){}
  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(heroes=>this.heroes=heroes)
  
    
  }

  searchHero(){
    const value:string=this.searchInput.value || '';
    if(value==='')return
    this.heroeService.getSuggestions(value).subscribe(heroes=>this.heroes=heroes)
    console.log(this.heroes);
    
  }
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
   const value:Hero | undefined=event.option.value;
   console.log(event.option.value);
   if(value===undefined)return
this.searchInput.setValue(value.superhero)
    this.router.navigate(['/heroes/'+value.id])
    }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',

})
export class HeroPageComponent implements OnInit {
public hero?:Hero;

  constructor(private heroService:HeroesService, private activateRoute:ActivatedRoute,private router:Router) {
    
  }
 
  ngOnInit(): void {
   this.activateRoute.params.pipe(
    delay(100),
  switchMap(({id})=>this.heroService.getHeroById(id))

   ).subscribe(hero=>{
    if(!hero){ return this.router.navigate(['/heroes/list']) }
    this.hero=hero;
    return;
   })
  }

  goBack():void{
     this.router.navigate(['/heroes/list'])
  }
}

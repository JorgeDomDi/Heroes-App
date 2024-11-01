import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {



  public heroForm = new FormGroup({
    alt_image: new FormControl<string>(''),
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>('')
  })
  constructor(private heroService: HeroesService,
     private activateRoute: ActivatedRoute,
      private router: Router,
       private snackbar: MatSnackBar,
      private dialog:MatDialog) {

  }
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return
    })
  }


  public publishers = [
    { id: 'DC Comics', desc: 'Dc - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;

  }
  onSubmit(): void {
    // console.log(
    //   {
    //     formIsValid:this.heroForm.valid,
    //     value:this.heroForm.value,
    //   }
    // );
    if (this.heroForm.invalid) return;
    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe(hero => {
        //todo: mostrar snackbar
        this.showSnackBar(`${hero.superhero} updated!`)

      })
      return;
    }
    if (!this.currentHero.id) {
      this.heroService.addHero(this.currentHero).subscribe(hero => {
        //todo: mostrar snackbar, y navegar a herores/edit/hero.id
        this.showSnackBar(`${hero.superhero} created!`)
        this.router.navigate(['/heroes/edit', hero.id])
      })
      return;
    }
    // this.heroService.updateHero(this.heroForm.value)
  }
onConfirmDletion():void{
  if(!this.currentHero.id) throw Error("Hero id is required")
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroService.deleteHero( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data:this.heroForm.value
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // //   console.log('The dialog was closed');
    // //  console.log({result});
    //  if(!result)result:
    //  console.log('deleted');
    //  this.heroService.deleteHero(this.currentHero.id).subscribe(wasDeleted =>{
    //   if(wasDeleted){
    //     this.router.navigate(['/heroes/'])
    //   }
    //  })

     
     
    // });
}
  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }
}

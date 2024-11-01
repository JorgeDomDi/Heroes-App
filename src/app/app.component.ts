import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  title = '06-heroesApp';
constructor(private authService:AuthService){

}
  // ngOnInit(): void {
  //   this.authService.checkAuthentication().subscribe(()=>{
  //     console.log('Check Authentication finished');
      
  //   })

  // }
}

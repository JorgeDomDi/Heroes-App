import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

public sidebarItems=[
  {    label:'Listado',icon:'label',url:'./list'  },
  {    label:'Añadir',icon:'add',url:'./new-hero'  },
  {    label:'Buscar',icon:'search',url:'./search'  },
]
constructor(private authService:AuthService, private router:Router){

}
onLogout() {
localStorage.clear();
this.router.navigate(['/auth/'])
  }
  get user():User | undefined {
    return this.authService.getCurrentUser()
  }
}

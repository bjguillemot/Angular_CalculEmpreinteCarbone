import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../../services/user';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected showLogoutBtn: boolean;

  constructor(private readonly authService: User, private readonly router: Router){
    this.showLogoutBtn = authService.isLogged();
  }

  goToSummary(){
    this.router.navigateByUrl('/summary')
    this.authService.login("Jean");
  }

  logout(){
    if(this.authService.isLogged()){
      this.authService.logout();
      this.showLogoutBtn = false;
    } 
  }
}

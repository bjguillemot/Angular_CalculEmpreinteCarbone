import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected showLogoutBtn: boolean;
  protected username: string;
  protected password: string;
  protected hasErrorLogin: boolean;

  constructor(private readonly authService: User, private readonly router: Router){
    this.showLogoutBtn = authService.isLogged();
    this.username = '';
    this.password = '';
    this.hasErrorLogin = false;
  }

  goToSummary(){
    this.router.navigateByUrl('/summary')
  }

  onClickLogout() {
    if (this.authService.isLogged()) {
      this.authService.logout();
      this.showLogoutBtn = false;
    }
  }

  onClickLogin() {
    const isUsernameValid: boolean = this.username.trim().length > 3;
    const isPasswordValid: boolean = this.password.trim().length > 6;
    if (isPasswordValid && isUsernameValid) {
      this.hasErrorLogin = false;
      if (!this.authService.isLogged()) {
      this.authService.login(this.username);
      this.showLogoutBtn = true;
      }
    } else {
      this.hasErrorLogin = true;
    }
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { User } from '../../services/user';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private readonly authService: User, private readonly router: Router){}

  goToSummary(){
    this.router.navigateByUrl('/summary')
    this.authService.login("Jean");
  }
}

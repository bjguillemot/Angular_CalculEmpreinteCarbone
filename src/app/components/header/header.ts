import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { User } from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected username: string;
  protected profileLink: string;

  constructor(private readonly authService: User) {
    this.username = authService.getUsername();
    this.profileLink = "/profile/" + this.username
  }
}

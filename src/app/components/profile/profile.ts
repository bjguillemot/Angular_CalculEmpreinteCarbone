import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  public username: string | null;

  constructor(private readonly route: ActivatedRoute) {
    this.username = route.snapshot.paramMap.get('username');
  }
}

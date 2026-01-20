import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  login(username: string) {
    console.log("Login with " + username);
    localStorage.setItem('user', username);
  }

  logout() {
    console.log("Logout with " + this.getUsername());
    localStorage.removeItem('user');
  }

  getUsername(): string {
    return localStorage.getItem('user') ?? '';
  }

  isLogged(): boolean {
    return !!localStorage.getItem('user')
  }
  
}

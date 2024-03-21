import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn: boolean = false;
  private registeredUsers: { email: string, password: string }[] = [];
  public firstName: string = '';
  public lastName: string = '';
  private id: string = '';
  private manageId: string = '';
  
  constructor(private router: Router) {
    // Load registered users from local storage
    const usersJson = localStorage.getItem('registeredUsers');
    if (usersJson) {
      this.registeredUsers = JSON.parse(usersJson);
    }
  }

  register(email: string, password: string) {
    // Add new user to the list of registered users
    this.registeredUsers.push({ email, password });
    // Save updated list to local storage
    localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
  }

  login(email: string, password: string, firstName: string, lastName: string, id: string, manageId: string): any {
    if (email && password) {
      this.loggedIn = true;
      this.firstName = firstName;
      this.lastName = lastName;
      this.id = id;
      this.manageId = manageId;

      // Store user information in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.id,
        manageId: this.manageId
      }));

      return true;
    }
    return false;
  }

  logout() {
    // Clear logged-in user from local storage and reset authentication state
    localStorage.removeItem('registeredUsers');
    localStorage.removeItem('currentUser')
    this.loggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}

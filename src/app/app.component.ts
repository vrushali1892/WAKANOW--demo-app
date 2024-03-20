import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';

  public sidebarShow: boolean = false;
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        this.authService.loggedIn = true;
        this.authService.firstName = user.firstName;
        this.authService.lastName = user.lastName;
    }
  }

  logout() {
    this.authService.logout();
    this.sidebarShow = false;
  }

}

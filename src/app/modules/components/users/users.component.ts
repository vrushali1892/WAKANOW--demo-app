import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: any[] = [];
  showLoggedInUser: any;
  userid?: string;
  userInfo: any = {};

  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUserDetails();
  }

  // to get current user from local storage
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userid = user.id;
    }
  }

  // to display registered users
  getUserDetails() {
    this.userService.getRegisteredUsers().subscribe((response: any) => {
      // to get all registered users from db
      this.usersList = response; 

      //to fetch current logged in user from above data
      this.userInfo = this.usersList.find(u => u.id === this.userid); 

      // to fetch only that user who is managed by currently logged in user
      this.usersList = this.usersList.filter(u => u.id === this.userInfo.manageId); 
    })
  }

  updateOldAdmin() {
    if (this.userInfo) {
      // to pass the admin authority to next user
      this.userInfo.isCurrentAdmin = false;
    }
    this.userService.updateRegisteredUser(this.userInfo)
      .subscribe(response => {
      });
  }

  // to approve new registered user
  onApprove(data: any) {
    this.updateOldAdmin(); 
    data.isApproved = true;
    data.isCurrentAdmin = true;
    this.userService.updateRegisteredUser(data)
      .subscribe(response => {
        this.toastrService.success('User approved successfully!', 'Approve User', {
          positionClass: 'toast-top-right'
        });
      });
  }

}

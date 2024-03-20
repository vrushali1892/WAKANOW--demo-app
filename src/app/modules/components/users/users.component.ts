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
  disableApprove: boolean = false;

  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUserDetails();
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userid = user.id;
    }
  }

  userInfo: any = {};
  getUserDetails() {
    this.userService.getRegisteredUsers().subscribe((response: any) => {
      this.usersList = response;
      this.userInfo = this.usersList.find(u => u.id === this.userid);
      console.log(this.userInfo);
      this.usersList = this.usersList.filter(u => u.id !== this.userid);
    
    })
  }

  updateOldAdmin() {
    if(this.userInfo) {
      this.userInfo.isCurrentAdmin = false;
    }
    this.userService.updateRegisteredUser(this.userInfo)
      .subscribe(response => {
        //this.disableApprove = true;
      });
  }

  onApprove(data: any) {
   this.updateOldAdmin();
    data.isApproved = true;
    data.isCurrentAdmin = true;
    this.userService.updateRegisteredUser(data)
      .subscribe(response => {
        this.toastrService.success('User approved successfully!', 'Approve User', {
          positionClass: 'toast-top-right'
        });
        //this.disableApprove = true;
      });
  }

}

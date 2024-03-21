import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersData: User[] = [];
  userid?: string;
  manageId?: string;
  userInfo: any = {};

  constructor(private userService: UserService, private modalService: NgbModal, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUsers();
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userid = user.id;
      this.manageId = user.manageId;
    }
  }

  getUsers() {
    this.userService.getRegisteredUsers().subscribe((response: any) => {
      this.usersData = response;
    })
  }

  manageUsers(title: string, users: any) {
    const modalRef = this.modalService.open(UserPopupComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = {
      header: title,
      data: users
    },
      modalRef.result.then((data) => {
        if (data.submitted) {
          this.getUsers();
          if (data.action == 'add') {
            this.toastrService.success('User added successfully!', 'Add User', {
              positionClass: 'toast-top-right'
            });
          }
          else {
            this.toastrService.success('User updated successfully!', 'Update User', {
              positionClass: 'toast-top-right'
            });
          }
        }
      }
      );
  }


  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.getUsers();
        this.toastrService.success('User deleted successfully!', 'Delete User', {
          positionClass: 'toast-top-right'
        });
      },
      (err) => console.log(err)
    );
  }

}

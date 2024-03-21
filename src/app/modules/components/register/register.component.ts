import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public submitted: boolean = false;
  public showPassword: boolean = false;
  private registeredUsers: any[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createRegistration();
  }

  createRegistration(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }


  get emailErrors() {
    return this.registerForm.get('email')?.errors;
  }


  toggleType(): void {
    this.showPassword = !this.showPassword;
  }

  signUp(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      const payload = this.registerForm.value;
      payload.isApproved = false; // prevent user to login before approved
      payload.isCurrentAdmin = false; // to check who is current admin from all users
      payload.job = '';
      payload.contact = '';
      payload.address = '';
      payload.manageId = ''; // to manage next immediate registered user
      this.userService.registerUsers(payload) // to register user
        .subscribe(response => {
          console.log(response); // fetch data of registered user
          this.updateManageId(response.id) // pass id of registered user to update manage id of current admin
          this.toastrService.success('Registration done successfully!', 'Register', {
            positionClass: 'toast-top-right'
          });
          this.submitted = false;
          this.router.navigate(['/login']);
        })
    }
  }

  //updating manage id of current admin
  updateManageId(id: any): void {
    this.userService.getRegisteredUsers()
    .subscribe((response:any) => {
      this.registeredUsers = response;
      const currentAdminData = this.registeredUsers.find(u => u.isCurrentAdmin === true);
      currentAdminData.manageId = id;
      this.updateManageIdByRegisteredId(currentAdminData)
    });
  }


 // to update the above manage id of current admin in database
  updateManageIdByRegisteredId(data: any): void {
    this.userService.updateUser(data, data.id)
    .subscribe(response => {
      console.log(response);
    });
  }
}

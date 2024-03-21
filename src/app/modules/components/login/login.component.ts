import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public showPassword: boolean = false;
  public userObj: any = {}
  private registeredUsers: any[] = [];
  public error: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private authService: AuthenticationService, private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegistration();
  }

  createRegistration():void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }


  get emailErrors() {
    return this.loginForm.get('email')?.errors;
  }


  toggleType():void {
    this.showPassword = !this.showPassword;
  }


  login():void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.userService.getRegisteredUsers()
        .subscribe((response:any) => {
          this.registeredUsers = response;
          const enteredEmail = this.loginForm.get('email')?.value;
          const enteredPassword = this.loginForm.get('password')?.value;
          const enteredUsers = this.registeredUsers.find(u => u.email === enteredEmail && u.password === enteredPassword);
          if (enteredUsers) {
            if (enteredUsers?.email === enteredEmail && enteredUsers?.password === enteredPassword) {
              if(enteredUsers?.isApproved === false) {
                this.error = 'User is not approved, kindly check with admin';
              }
              else {
                this.authService.login(enteredUsers.email, enteredUsers.password, enteredUsers.firstName, enteredUsers.lastName, enteredUsers.id, enteredUsers.manageId);
                this.toastrService.success('User Logged in successfully!', 'Login', {
                  positionClass: 'toast-top-right'
                });
                this.router.navigate(['/users']);
              }
            }
          } else {
            this.error = 'Invalid username or password! Check your credentials or register first';
            this.authService.loggedIn = false;
          }
        });
    }
  }
}

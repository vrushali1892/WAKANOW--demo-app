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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createRegistration();
  }

  createRegistration() {
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


  toggleType() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      const payload = this.registerForm.value;
      payload.isApproved = false;
      payload.isCurrentAdmin = false;
      payload.job = '';
      payload.contact = '';
      payload.address = '';
      this.userService.registerUsers(payload)
        .subscribe(response => {
          this.toastrService.success('Registration done successfully!', 'Register', {
            positionClass: 'toast-top-right'
          });
          this.submitted = false;
          this.router.navigate(['/login']);
        })
    }
  }

}

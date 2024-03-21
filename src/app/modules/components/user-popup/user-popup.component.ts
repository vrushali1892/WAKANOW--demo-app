import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {
  @Input() data: any;
  public usersForm!: FormGroup;
  public submitted: boolean = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createUsers();
  }

  createUsers(): void {
    this.usersForm = this.formBuilder.group({
      firstName: ['' || this.data.data.firstName, Validators.required],
      lastName: ['' || this.data.data.lastName, Validators.required],
      email: ['' || this.data.data.email, [Validators.required, Validators.email]],
      job: ['' || this.data.data.job, Validators.required],
      contact: ['' || this.data.data.contact, Validators.required],
      address: ['' || this.data.data.address, Validators.required]
    });
  }

  get f() { return this.usersForm.controls; }


  get emailErrors() {
    return this.usersForm.get('email')?.errors;
  }

  validateNumbers(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSave(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.usersForm.invalid) {
      return;
    }
    else {
      const payload = this.usersForm.value;

        this.userService.updateUser(payload, this.data.data.id)
          .subscribe(response => {
            this.activeModal.close({ submitted: this.submitted, action: 'update' });
          });
    }
  }
}

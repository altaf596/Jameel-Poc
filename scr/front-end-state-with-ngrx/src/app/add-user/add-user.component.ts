import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CreateUserInputDto } from 'src/shared/models/create-user-input-dto';
import { User } from 'src/shared/models/user-dto';
import { UserManagementServiceProxy } from 'src/shared/service-proxies/user-management.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm!: FormGroup;


  constructor(private _userManagementService: UserManagementServiceProxy,
    private _messageService: MessageService,
    private _router: Router) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  onSubmit(form: any) {
    console.log(form);
    if (this.userForm.valid) {
      let user: CreateUserInputDto = new CreateUserInputDto();
      user.firstName = this.userForm.get('firstName')?.value;
      user.lastName = this.userForm.get('lastName')?.value;

      let dateOfBirth: any = this.userForm.get('dob')?.value;
      user.dob = dateOfBirth.toLocaleDateString('en-GB');

      user.phoneNumber = this.userForm.get('phoneNumber')?.value;
      user.address = this.userForm.get('address')?.value;

      this._userManagementService.addUser(user).subscribe({
        next: (response) => {
          this._messageService.add({ key: 'onApp', severity: 'success', summary: 'Success', detail: JSON.parse(response) });
          setTimeout(() => {
            this._router.navigate(['/users']);
          }, 200);
        },
        error: (err) =>{
          this._messageService.add({ key: 'onApp', severity: 'error', summary: 'Error', detail: 'Kindly try again'});
        }
      })
    }

  }

}

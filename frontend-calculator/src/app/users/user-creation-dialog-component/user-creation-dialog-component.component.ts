import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { Users } from 'shared';
import { response } from 'express';

@Component({
  selector: 'app-user-creation-dialog-component',
  templateUrl: './user-creation-dialog-component.component.html',
  styleUrls: ['./user-creation-dialog-component.component.css']
})
export class UserCreationDialogComponentComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dialogRef: MatDialogRef<UserCreationDialogComponentComponent>
  ){
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, ]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.value) {
      const users = this.form.value as Users;
      this.userService.createUser(users).subscribe((response) =>{
        console.log(response);
        alert('User created successfully')
        this.form.reset(); 
        window.location.reload();
      })
      
      console.log('User creation data', users);

      // Close the dialog when user creation is complete
      this.dialogRef.close('User created successfully');
    } else {
      console.log('Form is not valid');
      alert('User data is not valid. Please try again.')
    }
  }
  onCancel(): void{
    // Close the dialog
    this.dialogRef.close();
   }
}


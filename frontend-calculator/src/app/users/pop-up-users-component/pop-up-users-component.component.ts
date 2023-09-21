import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'shared';
import { UsersService } from '../users.service';
import { response } from 'express';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-users-component',
  templateUrl: './pop-up-users-component.component.html',
  styleUrls: ['./pop-up-users-component.component.css']
})
export class PopUpUSersComponentComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService,
    private dialogRef: MatDialogRef<PopUpUSersComponentComponent>){
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit(): void{
    if(this.form.value){
      console.log(this.form.value);
      const users = this.form.value as Users;
      this.userService.updateUser(users.username, users).subscribe((response) => {
        console.log(response);
        alert('User updated successfully')
        this.form.reset(); 
        window.location.reload();
      })
    }else{
      console.log('Form is not valid');
    }

  }

  onCancel(): void{
     // Close the dialog
     this.dialogRef.close();
    }
  }



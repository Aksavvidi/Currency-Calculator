import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserAPIList, Users } from 'shared';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpUSersComponentComponent } from '../pop-up-users-component/pop-up-users-component.component';
import { UserCreationDialogComponentComponent } from '../user-creation-dialog-component/user-creation-dialog-component.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.css']
})
export class UsersAllComponent implements OnInit, OnDestroy{
  constructor(
    private UserService: UsersService,
    private appService: AppService,
    private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
 
  loading = false;
  userList: Users[] = [];
  searchQuery: string = '';

  subscription: Subscription | undefined;

  openUserCreationDialog(): void {
    const dialogRef = this.dialog.open(UserCreationDialogComponentComponent, {
      width: '500px',height:'50vh', 
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result when the dialog is closed (e.g., user creation completed)
      console.log('The dialog was closed', result);
    });
  }

  openPopup(users?:Users): void{
    const dialogRef = this.dialog.open(PopUpUSersComponentComponent, {
      width: '500px',height:'50vh',
      data: users //Pass the existing data here
    });
    dialogRef.afterClosed().subscribe()
  }

  ngOnInit(): void {
    console.log('Starting "find all" API call');
    //this.loading = true;
    this.appService.setIsLoading(true);
    this.UserService.findAll().subscribe({
      next: (apiData: UserAPIList) => {
        console.log(apiData);
        const users: Users[]  = apiData.users;
        this.userList = users;

        console.log('Users', users); 
      },
      error: (error) => {
        this.appService.setIsLoading(false);
        console.log(error)},

      complete: () => {
        this.appService.setIsLoading(false);
        console.log('API call completed');
      },
    })
  }

  onSearch():void{
    if(this.searchQuery.trim() !== ''){
      this.loading = true;
      this.subscription = this.UserService.findOne(this.searchQuery).subscribe({
        next:(response:any)=> {
          const{users} = response;
          this.userList = users ? [users] : [];
        },
      error:(error) => {
        this.loading = false;
        console.log(error);
        console.log('API call findOne completed');
      },
      complete:()=>{
        this.loading = false;
      }
      });
    }
  }

  OnUserDelete(username:string){
    this.loading = true;
    this.UserService.deleteUser(username).subscribe({
      next:(response) =>{
        alert('User deleted');
        this.ngOnInit();
      },
      error:(error)=> {
        this.loading = false;
        console.log(error)
      },
      complete:() =>{
        this.loading = false;
        window.location.reload();
        console.log('API call delete completed');
      },

  })
}

createUser(){
  console.log("create a user")
}
}


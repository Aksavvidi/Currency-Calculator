import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { UsersService } from './users.service';
import { AppService } from '../app.service';

import { PopUpUSersComponentComponent } from './pop-up-users-component/pop-up-users-component.component';
import { UsersAllComponent } from './users-all/users-all.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserCreationDialogComponentComponent } from './user-creation-dialog-component/user-creation-dialog-component.component';
import { tap } from 'rxjs';
import { CanActivateUserGuard } from '../can-activate-user.guard';

//Route guard, checks whether a user is logged in and, if not, redirects them to the login page 
// const userGuard = () => {
//   const router = inject(Router);
//   const service = inject(AppService);
//   return service.isLoggedIn$.pipe(
//     tap((isLoggedIn) => {
//       if(!isLoggedIn) router.navigate(['/login']);
//     })
//   );
// };

const routes: Routes = [
  {path:'', component: UsersAllComponent,}// canActivate: [CanActivateUserGuard] },
];

@NgModule({
  declarations: [
    UsersAllComponent,
    PopUpUSersComponentComponent,
    UserCreationDialogComponentComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UsersService]
})
export class UsersModule { }

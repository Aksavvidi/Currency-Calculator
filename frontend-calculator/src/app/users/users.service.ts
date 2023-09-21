import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAPIList, Users } from 'shared';
import { delay } from 'rxjs';

const USER_API = 'http://localhost:3000/api/user'

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<UserAPIList>(`${USER_API}/`).pipe(delay(1000));
  }

  findOne(username: string){
    return this.http.get<UserAPIList>(`${USER_API}/${username}`)
  }
  deleteUser(username: string){
    return this.http.delete<UserAPIList>(`${USER_API}/delete/${username}`);
  }

  updateUser(username:string, users: Users){
    return this.http.patch<UserAPIList>(`${USER_API}/update/${username}`, users);
  }

  createUser(users: Users){
    return this.http.post<UserAPIList>(`${USER_API}/`, users);
  }
}

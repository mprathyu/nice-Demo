import { Injectable } from '@angular/core';
import { User } from './user';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Headers} from '@angular/http';

@Injectable()
export class UserService {
  Ulist: User[];
  constructor(private http:HttpClient) {
    }
  getUsersFromData(){
    return this.http.get('http://localhost:8080/users');
  }
  addUser(user: User) {
    let userObj = { id:0,userName: user.userName};
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.post('http://localhost:8080/users/',userObj);
  }
  updateUser(user: User) {
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.put('http://localhost:8080/users/'+ user.id,user);
  }
  deleteUser(user: User) {
    return this.http.delete('http://localhost:8080/users/'+ user.id);
  }
}

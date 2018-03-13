import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './user';
import { UserService } from './user.service';

export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formGroup: FormGroup;
  userList: any;
  saveMode: SaveMode = SaveMode.None;
  headerText: string;

  constructor(private _userService: UserService, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'userName': '',
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
     this._userService.getUsersFromData().subscribe((result) => {
       this.userList = result;
      }); 
    	 
  }

  saveUser(user: User) {
    if (user.id) {
       this._userService.updateUser(user).subscribe((result) => {    
         this.getUsers();
      });
    } else {
      this._userService.addUser(user).subscribe((result) => {    
        this.getUsers();
      }); 
    }
    this.saveMode = SaveMode.None;
  }

  removeUser(user: User) {
     this._userService.deleteUser(user).subscribe((result) => {
       this.getUsers();
      }); 
  }

  cancelEditUser() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(user: User) {
    if (!user) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit User';
    const editedUser = Object.assign({}, user, { id: user.id});
    this.formGroup.setValue(editedUser);
  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New User';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }
}

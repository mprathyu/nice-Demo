import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './task.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  formGroup: FormGroup;
  taskList: any;
  saveMode: SaveMode = SaveMode.None;
  headerText: string;
  userList: any;
  statusOptions:any[]=['notstarted','inprogress','complete'];
  taskByStatus:any[]=['AllTasks','notstarted','inprogress','complete','notcompleted'];
  constructor(private _taskService: TaskService,private _userService: UserService, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'description': '',
      'name':'',
      'status':'',
      'assignedUser':''
      });
  }

  ngOnInit() {
    this.getTasks('');
    this.getUsers();

  }
  getUsers() {
     this._userService.getUsersFromData().subscribe((result) => {
      this.userList = result;
      }); 
    	 
  }
  onChange(deviceValue) {
    // console.log(deviceValue);
    if(deviceValue == 'AllTasks'){
      deviceValue ='';
    }
     this.getTasks(deviceValue)
  }
  getTasks(val) {
     this._taskService.getTasksFromData(val).subscribe((result) => {
       this.taskList = result;
      }); 
    	 
  }

  saveTask(task: Task) {
    if (task.id) {
       this._taskService.updateTask(task).subscribe((result) => {    
         this.getTasks('');
      });
    } else {
      task.status = 'notstarted';
      this._taskService.addTask(task).subscribe((result) => {    
        this.getTasks('');
      }); 
    }
    this.saveMode = SaveMode.None;
  }

  cancelEditTask() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(task: Task) {
    if (!task) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit Task';
    const editedTask = Object.assign({}, task, { id: task.id});
    this.formGroup.setValue(editedTask);
        console.log(this.formGroup);

  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New Task';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }
}

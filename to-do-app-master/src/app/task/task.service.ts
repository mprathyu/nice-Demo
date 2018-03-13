import { Injectable } from '@angular/core';
import { Task } from './task';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Headers} from '@angular/http';

@Injectable()
export class TaskService {
  Ulist: Task[];
  constructor(private http:HttpClient) {
    }
  getTasksFromData(val){
    return this.http.get('http://localhost:8080/tasks/' + val);
  }
  addTask(task: Task) {
    console.log(task);
    let taskObj = {id:task.id, name: task.name,description:task.description,status:task.status };
    // console.log(taskObj);
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.post('http://localhost:8080/tasks/add/users/'+task.assignedUser, taskObj);
  }
  updateTask(task: Task) {
    console.log(task);
    let taskObj = {id:task.id, name: task.name,description:task.description,status:task.status };
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.put('http://localhost:8080/tasks/update/users/'+task.assignedUser.id, taskObj);
  }
  // deleteTask(task: Task) {
  //   return this.http.delete('http://localhost:8080/tasks/'+ task.id);
  // }
}

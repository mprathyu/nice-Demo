import { Injectable } from '@angular/core';
import { Todo } from './to-do';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import {Headers} from '@angular/http';

@Injectable()
export class TodoService {
  Ulist: Todo[];
  constructor(private http:HttpClient) {
    }
  getTodosFromData(val){
    return this.http.get('http://localhost:8080/todolists/' + val);
  }
  addTodo(todo: Todo) {
    console.log(todo);
    let todoObj = {id:todo.id, name: todo.name};
    // // console.log(todoObj);
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.post('http://localhost:8080/todolists', todoObj);
  }
  updateTodo(todo: Todo) {
    console.log( todo.tasksList);
    // let taskList = {id:todo.id, name: todo.name,description:todo.description,status:todo.status };
    const headers= new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.post('http://localhost:8080/todolists/'+todo.id+'/addtask', todo.tasksList);
  }
  deleteTodo(todo: Todo) {
    return this.http.delete('http://localhost:8080/todolists/'+ todo.id);
  }
}

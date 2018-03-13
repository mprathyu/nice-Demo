import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from './to-do';
import { TodoService } from './to-do.service';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-todo',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  formGroup: FormGroup;
  todoList: any;
  saveMode: SaveMode = SaveMode.None;
  headerText: string;
  taskList: any;
  statusOptions:any[]=['notstarted','inprogress','complete'];
  todoByStatus:any[]=['AllToDos','notstarted','inprogress','complete','notcompleted'];
  constructor(private _todoService: TodoService,private _taskService: TaskService, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'name':'',
      'tasksList':[]
      });
  }

  ngOnInit() {
    this.getToDos('');
    this.getTasks();

  }
  getTasks() {
     this._taskService.getTasksFromData('').subscribe((result) => {
      this.taskList = result;
      }); 
    	 
  }
  // onChange(deviceValue) {
  //   // console.log(deviceValue);
  //   if(deviceValue == 'AllToDos'){
  //     deviceValue ='';
  //   }
  //    this.getToDos(deviceValue)
  // }
  getToDos(val) {
     this._todoService.getTodosFromData(val).subscribe((result) => {
       this.todoList = result;
      }); 
    	 
  }

  saveToDo(todo: Todo) {
    if (todo.id) {
       this._todoService.updateTodo(todo).subscribe((result) => {    
         this.getToDos('');
      });
    } else {
      this._todoService.addTodo(todo).subscribe((result) => {    
        this.getToDos('');
      }); 
    }
    this.saveMode = SaveMode.None;
  }

  cancelEditToDo() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }
  removeTodo(todo: Todo) {
     this._todoService.deleteTodo(todo).subscribe((result) => {
       this.getToDos('');
      }); 
  }
  showEditForm(todo: Todo) {
    if (!todo) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit ToDo';
    const editedToDo = Object.assign({}, todo, { id: todo.id});
    this.formGroup.setValue(editedToDo);
        console.log(this.formGroup);

  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New ToDo';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }
}

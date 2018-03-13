import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { TodoService } from './to-do/to-do.service';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';
import { FontsService } from '../fonts/fonts.service';
import { AppRoutingModule }     from './app-routing.module';
import { TaskComponent }      from './task/task.component';
import { UserComponent }  from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    UserComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TodoService, FontsService,TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

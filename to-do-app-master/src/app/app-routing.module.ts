import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoComponent }   from './to-do/to-do.component';
import { TaskComponent }      from './task/task.component';
import { UserComponent }  from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ToDoComponent },
  { path: 'task', component: TaskComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
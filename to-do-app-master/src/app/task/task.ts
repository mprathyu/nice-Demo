
import { User } from '../user/user';

export interface Task {
  name:string;
  description:string;
  status:string;
  assignedUser:User;
  id:number;
  todolist:string;
}

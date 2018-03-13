import { Task } from '../task/task';

export interface Todo {
  id: number;
  name: string;
  tasksList:[Task];
}

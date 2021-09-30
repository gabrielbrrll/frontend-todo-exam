import {Todo} from "models/todo";
import {
  SET_TODO,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  UPDATE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from "./actions"

export interface SetTodoAction {
  type: typeof SET_TODO,
  payload: Array<Todo>
}

export interface CreateTodoAction {
  type: typeof CREATE_TODO,
  payload: Todo
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO,
  payload: string
}

export interface DeleteAllTodosAction {
  type: typeof DELETE_ALL_TODOS,
  payload: Todo[]
}

export interface UpdateTodoAction {
  type: typeof UPDATE_TODO,
  payload: Todo
}

export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS,
  payload: {
    checked: boolean, 
    todoId: string
  }
}

export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS,
  payload: {
    todos: Todo[],
    checked: boolean
  }
}

export type AppActions =
  SetTodoAction |
  CreateTodoAction |
  UpdateTodoAction |
  UpdateTodoStatusAction |
  DeleteTodoAction |
  DeleteAllTodosAction |
  ToggleAllTodosAction;
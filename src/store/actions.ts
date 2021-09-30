import {Todo} from "models/todo";
import { 
  SetTodoAction, 
  CreateTodoAction, 
  DeleteTodoAction, 
  DeleteAllTodosAction,
  ToggleAllTodosAction, 
  UpdateTodoAction,
  UpdateTodoStatusAction
} from './types'

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = "UPDATE_TODO"
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos
  }
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
}

export function updateTodo(todo: Todo): UpdateTodoAction {
  return {
    type: UPDATE_TODO,
    payload: todo
  }
}

export function updateTodoStatus(checked: boolean, todoId: string): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      checked,
      todoId,
    }
  }
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

export function deleteAllTodos(todos: Todo[]): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
    payload: todos,
  }
}

export function toggleAllTodos(todos: Todo[], checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: {
      todos,
      checked
    }
  }
}
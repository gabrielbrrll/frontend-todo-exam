import {Todo, TodoStatus} from 'models/todo';
import { AppActions } from './types';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  TOGGLE_ALL_TODOS,
  SET_TODO,
} from './actions'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }

    case DELETE_TODO:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: filteredTodos
      }

    case UPDATE_TODO:
      const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[todoIdx] = action.payload;

      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_STATUS:
      const idx = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[idx].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        const updatingTodoIdx = action.payload.todos.findIndex((todo) => e.id === todo.id)
        return updatingTodoIdx >= 0 ? ({
          ...e,
          status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }) : e
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_ALL_TODOS:
      const deletingIds = action.payload.map(todo => todo.id)
      const updatedTodos = state.todos.filter(todo => !deletingIds.includes(todo.id))
      return {
        ...state,
        todos: updatedTodos
      }
    default:
      return state;
  }
}

export default reducer;
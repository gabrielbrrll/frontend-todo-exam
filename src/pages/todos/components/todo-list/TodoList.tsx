import React from 'react'
import { Todo, TodoStatus, } from 'models/todo';
import { TodoItem } from '..';
import { ToggleModes } from '../todo-item/TodoItem';
import { ChangeEvent } from 'pages/todos/Todos';

interface TodoListProps {
  todos: Array<Todo>
  toggleTodo: (toggleMode: ToggleModes, todo: Todo) => void
  onStatusUpdate?: (e: ChangeEvent, todoId: string) => void
  activeTodoUpdate?: Todo
  activeTag?: string
}

const TodoList = ({ 
    todos, 
    toggleTodo, 
    onStatusUpdate, 
    activeTodoUpdate, 
    activeTag 
}: TodoListProps) => {
    const activeTodos = todos.filter((todo) => todo.status === TodoStatus.ACTIVE)
    const completedTodos = todos.filter((todo) => todo.status === TodoStatus.COMPLETED)
    return (
      <div className="Todo__list">
        {todos.length ? (
          <div>
            {
                activeTodos.map((todo) => {
                    return (
                        <TodoItem 
                          key={todo.id}
                          type="UPDATE"
                          todo={todo} 
                          toggleTodo={(toggleMode, todo) => toggleTodo(toggleMode, todo)} 
                          onStatusUpdate={(e) => onStatusUpdate?.(e, todo.id)}
                          activeTodoUpdate={activeTodoUpdate}
                          activeTag={activeTag}
                      />
                    );
                })
            }
            {
                completedTodos.map((todo) => {
                    return (
                        <TodoItem 
                          key={todo.id}
                          type="UPDATE"
                          todo={todo} 
                          toggleTodo={(toggleMode, todo) => toggleTodo(toggleMode, todo)} 
                          onStatusUpdate={(e) => onStatusUpdate?.(e, todo.id)}
                          activeTodoUpdate={activeTodoUpdate}
                          activeTag={activeTag}
                      />
                    );
                })
            }
        </div>
        ) : (
          <div className="Todo__empty">Let's get to work! Add some!</div>
        )}
      </div>
  )
}

export default TodoList;
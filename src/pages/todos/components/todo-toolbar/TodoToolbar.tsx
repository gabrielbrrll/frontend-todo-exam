import { Todo, TodoStatus } from 'models/todo';
import React from 'react'

import MENU_ICON from 'assets/menu.svg';

interface ITodoToolbar {
  isEveryTodoComplete: boolean
  onToggleAllTodo: (isChecked: boolean) => void
  onDeleteAllTodo: () => void
  onMenuClick?: () => void
  activeFilter?: string
  todos?: Array<Todo>
}

const TodoGroups = ({ 
  isEveryTodoComplete, 
  onToggleAllTodo, 
  onDeleteAllTodo, 
  onMenuClick,
  activeFilter = "All",
  todos = [],
}: ITodoToolbar) => {

  const getTodoCounter = () => {
    let totalCount = todos.length
    let totalCompletedCount = todos.reduce((acc, todo) => (
      todo.status === TodoStatus.COMPLETED ? acc += 1 : acc)
    ,0)
    
    return `${(totalCount && 
      (activeFilter !== TodoStatus.COMPLETED && activeFilter !== TodoStatus.ACTIVE)
    ) ? totalCompletedCount + ' / ' : ''}  ${totalCount}`
  }

  return (
      <div className="Todo__toolbar">
          <div className="flex items-center" >
            <button className="btn btn--unstyled btn__mobile-menu" onClick={onMenuClick}>
              <img src={MENU_ICON} alt="menu"  />
            </button>
            <div className="Todo__filter">{activeFilter.toLowerCase()}</div>
            <div className="Todo__counter">{getTodoCounter()}</div>
          </div>
          <div className="flex items-center">
            {todos.length > 0 && (
              <button className="btn btn--primary" onClick={() => onToggleAllTodo(!isEveryTodoComplete)}>
                {isEveryTodoComplete ? 'Reset' : 'Complete'} all
              </button>
            )}
            {todos.length > 0 && (
              <button className="btn btn--primary" onClick={onDeleteAllTodo}>
                  Delete all
              </button> 
            )}
          </div>
      </div>
  )
}

export default TodoGroups;
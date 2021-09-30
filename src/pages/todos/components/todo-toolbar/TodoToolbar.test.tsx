import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoToolbar from './TodoToolbar'
import { Todo, TodoStatus } from 'models/todo';

const todoTestData: Todo[] = [
  {
    id: 'id',
    user_id: 'user_id',
    content : 'Do ropes',
    description: 'jump around lol',
    label: 'exercise',
    isPriority: false,
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  }
]

describe('Todo Toolbar tests', () => {
  const onToggleAllTodo = jest.fn()
  const onDeleteAllTodo = jest.fn()

  it('shows complete all when not all todos are finished', () => {
    render(
      <TodoToolbar 
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
        todos={todoTestData}
        isEveryTodoComplete={false}
      />
    )
  
    const completeAllButton = screen.getByText("Complete all")
    expect(completeAllButton).toBeInTheDocument()
  });
  
  it('hides complete all when todos are all complete', () => {
    render(
      <TodoToolbar 
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
        todos={todoTestData}
        isEveryTodoComplete={true}
      />
    )
  
    const completeAllButton = screen.queryByText("Complete all")
    expect(completeAllButton).not.toBeInTheDocument()
  });
  
  it('shows reset all all todos are finished', () => {
    render(
      <TodoToolbar 
        onDeleteAllTodo={onDeleteAllTodo}
        onToggleAllTodo={onToggleAllTodo}
        todos={todoTestData}
        isEveryTodoComplete={true}
      />
    )
  
    const completeAllButton = screen.getByText("Reset all")
    expect(completeAllButton).toBeInTheDocument()
  });
  
  
 it('have menu with styling that shows menu only on mobile', () => {
  render(
    <TodoToolbar 
      todos={todoTestData}
      isEveryTodoComplete={true}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleAllTodo={onToggleAllTodo} 
    />
  )

  const menuButton = screen.queryByRole("button", { name: "menu" })
  expect(menuButton).toHaveClass('btn btn--unstyled btn__mobile-menu')
 })

 it('displays active filter/task group as header', () => {
   render(
    <TodoToolbar 
      todos={todoTestData}
      isEveryTodoComplete={true}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleAllTodo={onToggleAllTodo} 
      activeFilter="Priority" 
    />
  )

   screen.getByText("priority")
 })
})
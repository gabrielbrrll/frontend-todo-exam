import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList'
import { Todo, TodoStatus } from 'models/todo';

const mockTodos: Todo[] = [
  {
    id: 'id1',
    user_id: 'user_id',
    content : 'Do ropes',
    description: 'jump around lol',
    label: 'exercise',
    isPriority: false,
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
  {
    id: 'id2',
    user_id: 'user_id',
    content : 'Finish website design',
    description: 'go layout!',
    label: 'work',
    isPriority: false,
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  }
]

describe('Todo list tests', () => {
  const toggleTodo = jest.fn();

  it('should render todo items', () => {
    render(<TodoList todos={mockTodos} toggleTodo={toggleTodo} />)

    mockTodos.forEach((todo) => {
      expect(screen.getByDisplayValue(todo.content))
   })
  })

  it('should render placeholder when todos are empty', () => {
    render(<TodoList todos={[]} toggleTodo={toggleTodo} />)

    const placeholderEl = screen.getByText("Let's get to work! Add some!");
    expect(placeholderEl).toBeInTheDocument()
  })
})
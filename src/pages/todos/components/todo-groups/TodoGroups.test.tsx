import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoGroups from './TodoGroups'
import { Todo, TodoStatus } from 'models/todo';

const mockTodos: Todo[] = [
  {
    id: 'id',
    user_id: 'user_id',
    content : 'Do ropes',
    description: 'jump around lol',
    label: 'exercise',
    isPriority: false,
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  },
  {
    id: 'id',
    user_id: 'user_id',
    content : 'Finish website design',
    description: 'go layout!',
    label: 'work',
    isPriority: false,
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  }
]

const mainGroups = ["All", "Completed", "Active", "Priority"]

describe('Todo Groups tests', () => {
  const filterByGroup = jest.fn()
  const uniqueLabels = Array.from(new Set(mockTodos.map(todo => todo.label)))
  const groups = [...uniqueLabels, ...mainGroups]

 it('render main groups and custom groups', () => {
   render(<TodoGroups filterByGroup={filterByGroup} todos={mockTodos} />)

   groups.forEach((group) => {
      const groupEl = screen.getByRole('button', { name: group });
      expect(groupEl).toBeInTheDocument();
   })
 })

 it('should highlight active group', () => {
  render(
    <TodoGroups
      todos={mockTodos}
      filterByGroup={filterByGroup}
      activeGroup="COMPLETED"
    />
  )
    const buttonEl = screen.getByRole('button', { name: 'Completed' });
    expect(buttonEl).toHaveClass('btn btn--unstyled flex justify-between w-full items-center btn--active')
  })

  it('buttons are clickable and filter as per filter', () => {
    const filterByGroup = jest.fn();

    render(<TodoGroups todos={mockTodos} filterByGroup={filterByGroup} />)

    groups.forEach((group) => {
      const groupEl = screen.getByRole('button', { name: group });
      fireEvent.click(groupEl);
    });

    expect(filterByGroup).toBeCalled()
  })

  it('should render exact count beside group label', () => {
    render(
      <TodoGroups
        todos={mockTodos}
        filterByGroup={filterByGroup}
        activeGroup="COMPLETED"
      />
    );

    const countEl = screen.getByRole('note', { name: "All" });
    expect(countEl).toHaveTextContent("2")
  })
})
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoItem from './TodoItem'
import { Todo, TodoStatus } from 'models/todo';

const mockTodo: Todo = {
  id: 'id',
  user_id: 'user_id',
  content : 'Do ropes',
  description: 'jump around lol',
  label: 'exercise',
  isPriority: true,
  status: TodoStatus.COMPLETED,
  created_date: new Date().toISOString(),
}

describe('Todo item -- CREATE', () => {
  it('should enable button when todo subject is not empty', () => {
    render(<TodoItem type="CREATE" />)

    const inputEl = screen.getByPlaceholderText("e.g. Buy some milk :)")
    const buttonEl = screen.getByRole('button', { name: "Create Task" })

    act(() => {
      fireEvent.change(inputEl, { target: { value: "Fetch some soda!" } });
    })

    expect(buttonEl).not.toBeDisabled()
  })

  it('should call respective function when creating task', () => {
    const toggleTodo = jest.fn()
    render(<TodoItem type="CREATE" toggleTodo={toggleTodo} />)

    const inputEl = screen.getByPlaceholderText("e.g. Buy some milk :)")
    const buttonEl = screen.getByRole('button', { name: "Create Task" })

    act(() => {
      fireEvent.change(inputEl, { target: { value: "Fetch some soda!" } });

      fireEvent.click(buttonEl)
    })

    expect(buttonEl).not.toBeDisabled()
  })

  it('should show cancel button to stop adding task', () => {
    const toggleTodo = jest.fn()
    render(<TodoItem type="CREATE" toggleTodo={toggleTodo} />)

    const buttonEl = screen.getByRole('button', { name: "Cancel" })

    fireEvent.click(buttonEl)

    expect(toggleTodo).toBeCalled()
  })

  it('should make content editable', () => {
    render(<TodoItem type="CREATE" />)

    const inputEl = screen.getByPlaceholderText("e.g. Buy some milk :)")
    expect(inputEl).toHaveClass('Todo__input--active Todo__content')
  })

  it('should make description editable', () => {
    render(<TodoItem type="CREATE" />)

    const inputEl = screen.getByPlaceholderText("Description")
    expect(inputEl).toHaveClass('Todo__input--active Todo__description')
  })

  it('should make task group/labels editable', () => {
    render(<TodoItem type="CREATE" />)

    const inputEl = screen.getByPlaceholderText("Untagged")
    expect(inputEl).toHaveClass('Todo__input--active Todo__tag')
  })

  it('should make priority checkbox toggable', () => {
    render(<TodoItem type="CREATE" />)

    const checkboxEl = screen.getByRole('checkbox', { name: 'isPriority' })
    expect(checkboxEl).not.toBeDisabled()
  })

  it('should display "Priority?" label beside the toggle', () => {
    const { getByText  } = render(<TodoItem type="CREATE" />)

    expect(getByText("Priority?"))
  })

  it('should preload value of todo filter state on tag/label field', () => {
    render(<TodoItem type="CREATE" activeTag="work" />)

    const inputEl = screen.getByDisplayValue("work")
    expect(inputEl).toHaveClass('Todo__input--active Todo__tag')
  })
})

describe('Todo item -- DISPLAY', () => {
  const onStatusUpdate = jest.fn()

  it('should make content readonly', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const inputEl = screen.getByDisplayValue("Do ropes")
    expect(inputEl).toHaveClass('Todo__input--inactive Todo__content')
  })

  it('should make description readonly', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const inputEl = screen.getByDisplayValue("jump around lol")
    expect(inputEl).toHaveClass('Todo__input--inactive Todo__description')
  })

  it('should show the task group', () => {
    const { getByText } =render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    expect(getByText('exercise'))
  })

  it('show priority display when task is priority', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const checkboxEl = screen.getByRole('checkbox', { name: 'isPriority' })
    expect(checkboxEl).toBeChecked()
  })

  it('should check completed toggle when task is complete', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const checkboxEl = screen.getByRole('checkbox', { name: 'status' })
    expect(checkboxEl).toBeChecked()
  })

  it('should render strikethrough when completed', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const inputEl = screen.getByDisplayValue("Do ropes")
    expect(inputEl).toHaveClass('Todo__input--inactive Todo__content Todo__input--strikethrough')
  })

  it('should make status toggable', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const checkboxEl = screen.getByRole('checkbox', { name: 'status' })
    expect(checkboxEl).not.toBeDisabled()
  })

  it('should call status function', () => {
    render(<TodoItem onStatusUpdate={onStatusUpdate} type="UPDATE" todo={mockTodo} />)

    const checkboxEl = screen.getByRole('checkbox', { name: 'status' })

    act(() => {
      fireEvent.click(checkboxEl)
    })

    expect(onStatusUpdate).toBeCalled();
  })
})

describe('Todo item -- UPDATE', () => {
  const onStatusUpdate = jest.fn()

  it('should be able to edit selected existing todo title', () => {
    const onStatusUpdate = jest.fn()

    render(
      <TodoItem 
        activeTodoUpdate={mockTodo} 
        onStatusUpdate={onStatusUpdate} 
        type="UPDATE" 
        todo={mockTodo} 
      />
    )

    const inputEl = screen.getByDisplayValue("Do ropes")
    expect(inputEl).toHaveClass('Todo__input--active Todo__content')
  })

  it('should be able to edit selected existing todo description', () => {
    render(
      <TodoItem 
        activeTodoUpdate={mockTodo} 
        onStatusUpdate={onStatusUpdate} 
        type="UPDATE" 
        todo={mockTodo} 
      />
    )

    const inputEl = screen.getByDisplayValue("jump around lol")
    expect(inputEl).toHaveClass('Todo__input--active Todo__description')
  })

  it('should be able to edit selected existing todo group/tag', () => {
    render(
      <TodoItem 
        activeTodoUpdate={mockTodo} 
        onStatusUpdate={onStatusUpdate} 
        type="UPDATE" 
        todo={mockTodo} 
      />
    )

    const inputEl = screen.getByDisplayValue("exercise")
    expect(inputEl).toHaveClass('Todo__input--active Todo__tag')
  })
  
  it('should make priority checkbox toggable', () => {
    render(
      <TodoItem 
        activeTodoUpdate={mockTodo} 
        onStatusUpdate={onStatusUpdate} 
        type="UPDATE" 
        todo={mockTodo} 
      />
    )

    const checkboxEl = screen.getByRole('checkbox', { name: 'isPriority' })
    expect(checkboxEl).not.toBeDisabled()
  })

  it('should display "Priority?" label beside the toggle', () => {
    const { getByText  } = render(
      <TodoItem 
        activeTodoUpdate={mockTodo} 
        onStatusUpdate={onStatusUpdate} 
        type="UPDATE" 
        todo={mockTodo} 
      />
    )

    expect(getByText("Priority?"))
  })
})
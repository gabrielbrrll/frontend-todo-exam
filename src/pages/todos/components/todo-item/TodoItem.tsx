import React, { useEffect, useState } from 'react'
import { Todo, TodoStatus } from 'models/todo';
import shortid from 'shortid';
import useHover from 'hooks/useHover';
import { ChangeEvent } from 'pages/todos/Todos';

export type ToggleModes = 'DELETE' | 'UPDATE' | 'CREATE' | 'CANCEL' | 'EDIT' | undefined

interface TodoItemProps {
  type: ToggleModes
  onStatusUpdate?: (e:ChangeEvent) => void
  todo?: Todo | Partial<Todo>
  toggleTodo?: (toggleMode: ToggleModes, todo: Todo) => void
  activeTodoUpdate?: Todo
  activeTag?: string
}

const TodoItem = ({ 
    type, 
    onStatusUpdate, 
    todo, 
    toggleTodo, 
    activeTodoUpdate, 
    activeTag 
}: TodoItemProps) => {
  const todoInitialState: Todo = {
    content: '',
    created_date: new Date().toISOString(),
    id: shortid(),
    user_id: "firstUser",
    description: '',
    label: '',
    isPriority: false,
    status: TodoStatus.ACTIVE
  }

  const defaultTags = ["ALL", "COMPLETED", "ACTIVE", "PRIORITY"]

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [isUpdating, setIsUpdating] = useState(false)
  const [todoEntry, setTodoEntry] = useState(type === "CREATE" ? todoInitialState : todo)

  const isTagShown = activeTag && !defaultTags.includes(activeTag)

  useEffect(() => {
    if (activeTag && activeTag === "PRIORITY") {
        setTodoEntry({
            ...todoEntry,
            isPriority: true,
        })
    } else if (isTagShown) {
        setTodoEntry({
            ...todoEntry,
            label: activeTag,
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeField = (e: ChangeEvent | React.ChangeEvent<HTMLTextAreaElement>) => {
      e.persist()
      if (e.target.name === 'isPriority') {
          setTodoEntry({
              ...todoEntry,
              [e.target.name]: !todoEntry?.[e.target.name]
          })
      } else {
          setTodoEntry({
              ...todoEntry,
              [e.target.name]: e.target.value
          })
      }
  }

  const isTodoUpdating = activeTodoUpdate?.id === todo?.id
  const inputClassName = (type === "CREATE" || isTodoUpdating) ? `Todo__input--active` : `Todo__input--inactive`

  return (
    <div className="Todo__item" key={todo?.id} data-testid="todo-item">
        <div className="flex">
            <div className="Todo__item-toggle">
                {type === "UPDATE" && (
                    <div className="Todo__checkbox">
                        <input
                            aria-label="status"
                            name="status"
                            onChange={onStatusUpdate}
                            type="checkbox"
                            checked={todo?.status === TodoStatus.COMPLETED}
                        />
                    </div>
                )}
            </div>
            <div 
                ref={hoverRef}
                className="w-full" 
            >
                <input 
                    aria-label="content"
                    className={
                        `${inputClassName} 
                        Todo__content 
                        ${todo?.status === TodoStatus.COMPLETED ? 'Todo__input--strikethrough' : ''}`
                    }
                    name="content"
                    readOnly={type !== "CREATE" && !isTodoUpdating}
                    onChange={onChangeField} 
                    placeholder="e.g. Buy some milk :)"
                    value={todoEntry?.content} 
                />
                {((type === "CREATE") || (todoEntry?.description || isTodoUpdating)) && (   
                    <textarea 
                        aria-label="description"
                        className={`${inputClassName} Todo__description`}
                        name="description"
                        rows={isTodoUpdating ? 2 : 1}
                        readOnly={!isTodoUpdating}
                        onChange={onChangeField}
                        placeholder="Description" 
                        value={todoEntry?.description} 
                    />
                )}
                <div className="flex items-center">
                    {(type === "CREATE" || isTodoUpdating) && (
                        <input 
                            aria-label="label"
                            className={`${inputClassName} Todo__tag`}
                            name="label"
                            readOnly={type !== "CREATE" && !isTodoUpdating}
                            onChange={onChangeField}    
                            placeholder="Untagged" 
                            maxLength={12}
                            value={todoEntry?.label?.toLowerCase()} 
                        />
                    )}
                    {(type === "UPDATE" && !isUpdating && !isTagShown) && <span className="Todo__input--inactive Todo__tag">{todoEntry?.label}</span>}
                    {(type === "CREATE" || isTodoUpdating || todoEntry?.isPriority) && (
                        <div className={`Todo__item-priority flex items-center ${isTagShown ? 'Todo__priority--left' : ''}`}>
                            <div className="Todo__checkbox">
                                <input
                                    name="isPriority"
                                    aria-label="isPriority"
                                    onChange={onChangeField}
                                    disabled={!isTodoUpdating}
                                    type="checkbox"
                                    checked={todoEntry?.isPriority}
                                />
                            </div>
                            {(type === "CREATE" || isTodoUpdating) && (<div className="Todo__priority-label">Priority?</div>)}
                        </div>
                    )}
                </div>
                {(isHovered || isTodoUpdating) && (
                    <div className="Todo__item-controls flex" data-testid="todo-controls">
                        {(type === "UPDATE" && !isTodoUpdating && todo?.status !== "COMPLETED") && (
                            <button
                                className="btn btn--primary btn--small"
                                onClick={() => {
                                    setIsUpdating(true) 
                                    toggleTodo?.("EDIT", todoEntry as Todo)
                                }}
                            >
                                Edit
                            </button>
                        )}
                        {(type !== "CREATE" && !isTodoUpdating) && (
                            <button
                                className="btn btn--primary btn--small btn--danger"
                                onClick={() => toggleTodo?.("DELETE", todoEntry as Todo)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
        {(isUpdating && isTodoUpdating) && (
            <div className="flex Todo___update-controls">
                <button
                    className={`
                        btn btn--primary btn--small ${todoEntry?.content ? 'btn--blue' :'btn--disabled'}`
                    }
                    disabled={!todoEntry?.content}
                    onClick={() => {
                        toggleTodo?.("UPDATE", todoEntry as Todo)
                        setIsUpdating(false)
                    }}
                >
                    Update
                </button>
                <button
                    className="btn btn--primary btn--small"
                    onClick={() => {
                        toggleTodo?.("CANCEL", todoEntry as Todo)
                        setTodoEntry(todo)
                        setIsUpdating(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        )}
        {type === "CREATE" && (
            <div className="Todo__controls flex">
                <button
                    className={`
                        btn btn--primary ${todoEntry?.content ? 'btn--blue' :'btn--disabled'}`
                    }
                    disabled={!todoEntry?.content}
                    onClick={() => {
                        toggleTodo?.("CREATE", todoEntry as Todo)
                        setTodoEntry(todoInitialState)
                    }}
                >
                    Create Task
                </button>
                <button
                    className="btn btn--primary"
                    onClick={() => {
                    toggleTodo?.("CANCEL", todoEntry as Todo)
                    setTodoEntry(todoInitialState)
                }}>
                    Cancel
                </button>
        </div>
        )}
    </div>
  )
}

export default TodoItem
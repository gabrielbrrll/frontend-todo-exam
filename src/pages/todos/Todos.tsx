import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from 'store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodo,
    updateTodoStatus,
} from 'store/actions';
import Service from 'service';
import {Todo, TodoStatus} from 'models/todo';
import {isTodoCompleted} from 'utils';
import { TodoItem, TodoList, TodoGroups, TodoToolbar } from './components'
import useOnClickOutside from 'hooks/useClickOutside';
import { ToggleModes } from './components/todo-item/TodoItem';

export type EnhanceTodoStatus = TodoStatus | 'ALL' | 'PRIORITY';
export type FormEvent = React.FormEvent<HTMLFormElement>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [todoFilter, setTodoFilter] = useState<EnhanceTodoStatus | string>('ALL')
	const [isCreating, setIsCreating] = useState(false);
    const [activeTodoUpdate, setActiveTodoUpdate] = useState<Todo | undefined>()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const mainRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/')
        }

        const fetchTodos = async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        }

        fetchTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        Service.saveTodos(todos);
    }, [todos])

    const filteredTodos = todos.filter((todo) => {
        switch (todoFilter) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            case "PRIORITY":
                return todo.isPriority
            case "ALL":
                return todo;
            default:
                return todo.label?.toLowerCase() === todoFilter.toLowerCase();
        }
    })

    const activeTodos = filteredTodos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const onCreateTodo = async (todo: Todo) => {
		try {
			const { content, description, label, isPriority, status } = todo
			const resp = await Service.createTodo(content, description, label, isPriority, status);
            dispatch(createTodo(resp));
		} catch (e) {
			// if (e.response.status === 401) {
			//     history.push('/')
			// }
		}
    }

    const onToggleTodo = (toggleMode: ToggleModes, todo: Todo) => {
        switch(toggleMode) {
            case "UPDATE":
                dispatch(updateTodo(todo))
                break
            case "DELETE":
                dispatch(deleteTodo(todo.id))
                break
            case "CREATE":
                onCreateTodo(todo)
                if (todoFilter !== "ALL") {
                    setTodoFilter(todo?.label?.toLowerCase() as string || 'untagged')
                }
                break
            case "CANCEL":
                setActiveTodoUpdate(undefined)
                break
            case "EDIT":
                setActiveTodoUpdate(todo)
                break
            default:
                return null
        }
        if (toggleMode !== "EDIT") {
            setActiveTodoUpdate(undefined)
        }
        setIsCreating(false)
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos(filteredTodos))
        setActiveTodoUpdate(undefined)
        setTodoFilter("ALL")
        setIsCreating(false)
    }

    const onToggleAllTodo = (isChecked: boolean) => {
        dispatch(toggleAllTodos(filteredTodos, isChecked))
        setActiveTodoUpdate(undefined)
        setIsCreating(false)
    }

    const filterByGroup = (status: string) => {
        setIsMobileMenuOpen(false)
        setTodoFilter(status)
		setIsCreating(false)
    }

    const onTodoStatusUpdate = (e: ChangeEvent, todoId: string) => {
        dispatch(updateTodoStatus(e.target.checked, todoId))
        setActiveTodoUpdate(undefined)
        Service.saveTodos(todos)
        setIsCreating(false)
    } 

    const handleClickOutside = () => {
        setIsMobileMenuOpen(false)
    }

    useOnClickOutside(mainRef, handleClickOutside)

    return (
        <div className="Todo_container">
            <section ref={mainRef} className={`Todo__nav ${!isMobileMenuOpen && 'Todo__nav--hidden'}`}>
                <div>
                    <span className="Todo__title">Akaru Task App</span>
                </div>
                <button 
                    onClick={() => {
                        history.push('/')
                        localStorage.clear()
                    }}
                    className="btn btn--unstyled btn--outline btn--gray"
                >
                    Sign out
                </button>
                <TodoGroups
                    filterByGroup={filterByGroup}
                    todos={todos}
                    activeGroup={todoFilter}
                />
            </section>
            <section className="Todo__fix" />
            <section className="Todo__main">
                <TodoToolbar
                    todos={filteredTodos}
                    isEveryTodoComplete={!activeTodos}
                    onToggleAllTodo={(isChecked) => onToggleAllTodo(isChecked)} 
                    onDeleteAllTodo={onDeleteAllTodo} 
                    activeFilter={todoFilter}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />
                <TodoList
                    todos={filteredTodos}
                    toggleTodo={(toggleMode, todo) => onToggleTodo(toggleMode, todo)}
                    onStatusUpdate={onTodoStatusUpdate}
                    activeTodoUpdate={activeTodoUpdate}
                    activeTag={todoFilter}
                />
                {isCreating && (
                    <TodoItem 
                        type="CREATE" 
                        toggleTodo={(toggleMode, todo) => onToggleTodo(toggleMode, todo)} 
                        activeTag={todoFilter}
                    />
                )}
                <div className="Todo__add-control">
                    {(!isCreating && todoFilter !== TodoStatus.COMPLETED) && (
                        <button 
                            className="btn btn--primary btn--outline" 
                            onClick={() => {
                                setActiveTodoUpdate(undefined)
                                setIsCreating(true)
                            }}
                        >
                            Add Task
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ToDoPage;
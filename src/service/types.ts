import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
    abstract signIn(username: string, password: string) : Promise<string>
    abstract getTodos() : Promise<Array<Todo>>
    abstract saveTodos(todos: Array<Todo>): Promise<Array<Todo>>
    abstract createTodo(content: string, description?: string, label?: string, isPriority?: boolean, status?: TodoStatus) : Promise<Todo>
}
import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            console.log("NCIE")
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string, description?: string, label?: string, isPriority?: boolean, status?: TodoStatus): Promise<Todo> {
        return Promise.resolve({
            content,
            description,
            label: label?.trim().toLowerCase() || "untagged",
            isPriority,
            status,
            created_date: new Date().toISOString(),
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async saveTodos(todos: Array<Todo>): Promise<Array<Todo>>{
        localStorage.setItem('todos', JSON.stringify(todos))
        return Promise.resolve(todos);
    }

    async getTodos(): Promise<Todo[]>{
        const todos = JSON.parse(localStorage.getItem('todos') || '[]')
        return Promise.resolve(todos)
    }
}

export default new ApiFrontend();
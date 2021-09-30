export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  description?: string
  label?: string
  isPriority?: boolean
  status?: TodoStatus
  created_date: string
}
import type { ReactNode, SubmitEvent } from 'react'
import type { ITodo, TTodoId } from '../components/TodoItem/props'

export type TFilter = 'all' | 'active' | 'completed'

export interface ITodoContext {
	todos: ITodo[]
	filter: TFilter
	visibleTodos: ITodo[]
	todosQuantity: Record<TFilter, number>
	setFilter: (filter: TFilter) => void
	toggleTodo: (todoId: TTodoId) => void
	deleteTodo: (todoId: TTodoId) => void
	editTodo: (todoId: TTodoId, newTitle: string) => void
	onSubmit: (e: SubmitEvent<HTMLFormElement>) => void
}

export interface ITodoContextProvider {
	children: ReactNode
}

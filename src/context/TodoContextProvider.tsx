import { useCallback, useMemo, useState, type SubmitEvent } from 'react'
import type { ITodoContext, ITodoContextProvider, TFilter } from '.'
import type { ITodo, TTodoId } from '../components/TodoItem/props'
import { mockTodos } from '../data/mockTodos'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TodoContext } from './todoContext'

export const TodoContextProvider = ({ children }: ITodoContextProvider) => {
	const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', mockTodos)
	const [filter, setFilter] = useState<TFilter>('all')

	const onSubmit = useCallback(
		(e: SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			const form = e.currentTarget
			const input = form.elements.namedItem('title') as HTMLInputElement
			const todoTitle = input.value.trim()
			if (!todoTitle) return

			setTodos(prev => [
				{
					id: crypto.randomUUID(),
					title: todoTitle,
					isActive: true
				},
				...prev
			])

			form.reset()
			input.focus()
		},
		[setTodos]
	)

	const toggleTodo = useCallback(
		(todoId: TTodoId) => {
			setTodos(prev =>
				prev.map(t => (t.id === todoId ? { ...t, isActive: !t.isActive } : t))
			)
		},
		[setTodos]
	)

	const deleteTodo = useCallback(
		(todoId: TTodoId) => {
			setTodos(prev => prev.filter(t => t.id !== todoId))
		},
		[setTodos]
	)

	const editTodo = useCallback(
		(todoId: TTodoId, newTitle: string) => {
			setTodos(prev =>
				prev.map(t => (t.id === todoId ? { ...t, title: newTitle } : t))
			)
		},
		[setTodos]
	)

	const visibleTodos = useMemo(() => {
		switch (filter) {
			case 'active':
				return todos.filter(t => t.isActive)
			case 'completed':
				return todos.filter(t => !t.isActive)
			default:
				return todos
		}
	}, [todos, filter])

	const todosQuantity = useMemo(() => {
		return {
			all: todos.length,
			active: todos.filter(t => t.isActive).length,
			completed: todos.filter(t => !t.isActive).length
		}
	}, [todos])

	const value = useMemo<ITodoContext>(
		() => ({
			todos,
			toggleTodo,
			deleteTodo,
			filter,
			setFilter,
			visibleTodos,
			todosQuantity,
			onSubmit,
			editTodo
		}),
		[
			todos,
			toggleTodo,
			deleteTodo,
			filter,
			visibleTodos,
			todosQuantity,
			onSubmit,
			editTodo
		]
	)

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

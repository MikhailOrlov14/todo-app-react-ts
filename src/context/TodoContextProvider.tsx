import { useMemo, useState, type FormEvent } from 'react'
import type { ITodoContext, ITodoContextProvider, TFilter } from '.'
import type { ITodo, TTodoId } from '../components/TodoItem/props'
import { mockTodos } from '../data/mockTodos'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TodoContext } from './todoContext'

export const TodoContextProvider = ({ children }: ITodoContextProvider) => {
	const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', mockTodos)
	const [filter, setFilter] = useState<TFilter>('all')

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const input = form.elements.namedItem('title') as HTMLInputElement
		const todoTitle = input.value.trim()

		if (!todoTitle.trim()) return

		const newTodo: ITodo = {
			id: String(crypto.randomUUID()),
			title: todoTitle,
			isActive: true
		}

		setTodos(prev => [newTodo, ...prev])

		form.reset()
		input.focus()
	}

	const toggleTodo = (todoId: TTodoId) => {
		setTodos(prev =>
			prev.map(todo =>
				todo.id === todoId ? { ...todo, isActive: !todo.isActive } : todo
			)
		)
	}

	const deleteTodo = (todoId: TTodoId) => {
		setTodos(prev => prev.filter(todo => todo.id !== todoId))
	}

	const editTodo = (todoId: TTodoId, newTitle: string) => {
		setTodos(prev =>
			prev.map(todo =>
				todo.id === todoId ? { ...todo, title: newTitle } : todo
			)
		)
	}

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

	const value: ITodoContext = {
		todos,
		toggleTodo,
		deleteTodo,
		filter,
		setFilter,
		visibleTodos,
		onSubmit,
		editTodo
	}

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

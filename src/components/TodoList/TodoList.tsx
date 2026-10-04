import { useTodos } from '../../context/useTodos'
import { TodoItem } from '../TodoItem/TodoItem'

export const TodoList = () => {
	const { visibleTodos, filter } = useTodos()

	if (visibleTodos.length === 0) {
		if (filter === 'all') {
			return (
				<div className="text-center font-semibold">
					You don`t have todos yet.
				</div>
			)
		}

		if (filter === 'completed') {
			return (
				<div className="text-center font-semibold">
					You don`t have completed todos.
				</div>
			)
		}

		if (filter === 'active') {
			return (
				<div className="text-center font-semibold">
					You don`t have active todos.
				</div>
			)
		}
	}

	return (
		<>
			<h2 className="text-md font-semibold">Todos:</h2>
			<ul className="flex flex-col gap-2 max-h-70 overflow-y-scroll">
				{visibleTodos.map(todo => {
					return <TodoItem key={todo.id} todo={todo} />
				})}
			</ul>
		</>
	)
}

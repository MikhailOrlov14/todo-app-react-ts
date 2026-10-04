import { Filters } from './components/Filters/Filters'
import { TodoForm } from './components/TodoForm/TodoForm'
import { TodoList } from './components/TodoList/TodoList'
import { useTodos } from './context/useTodos'

export default function App() {
	const { todos } = useTodos()

	return (
		<main className="flex justify-center items-center h-screen">
			<div className="max-w-140 w-full">
				<h1 className="text-2xl font-semibold mb-2">Todo App</h1>
				<TodoForm />
				{todos.length > 0 && <Filters />}
				<TodoList />
			</div>
		</main>
	)
}

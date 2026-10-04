import { Plus } from 'lucide-react'
import { useTodos } from '../../context/useTodos'

export const TodoForm = () => {
	const { onSubmit } = useTodos()

	return (
		<form onSubmit={onSubmit} className="flex gap-2 mb-2">
			<input
				className="flex-1 border border-black rounded-md outline-0 h-8 px-2 transition hover:bg-gray-100 focus:bg-black focus:text-white"
				type="text"
				name="title"
				placeholder="Todo title..."
			/>
			<button
				className="flex justify-center items-center text-white text-xl h-8 w-8 bg-black rounded-md cursor-pointer transition hover:opacity-80"
				type="submit"
				title="Add a new todo"
			>
				<Plus />
			</button>
		</form>
	)
}

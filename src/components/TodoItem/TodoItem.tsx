import { Edit, Save, Trash, X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import { useTodos } from '../../context/useTodos'
import type { ITodoProps } from './props'

export const TodoItem = ({ todo }: ITodoProps) => {
	const { toggleTodo, deleteTodo, editTodo } = useTodos()
	const [inputValue, setInputValue] = useState<string>(todo.title)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const commit = () => {
		const trimmed = inputValue.trim()
		if (trimmed && trimmed !== todo.title) {
			editTodo(todo.id, trimmed)
		}
		setIsEditing(false)
	}

	const cancel = () => {
		setInputValue(todo.title)
		setIsEditing(false)
	}

	const handleBlur = () => {
		commit()
		setIsEditing(false)
	}

	const handleEdit = () => {
		setInputValue(todo.title)
		setIsEditing(true)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			commit()
			setIsEditing(false)
		}

		if (e.key === 'Escape') {
			cancel()
		}
	}

	return (
		<li
			className={`flex items-center gap-2 min-h-8 px-2 border border-zinc-700 rounded-md transition ${!todo.isActive ? 'bg-zinc-900' : 'bg-zinc-50'}`}
		>
			{isEditing ? (
				<input
					autoFocus
					className="flex-1 h-6 px-2 outline-0 border border-zinc-500 rounded-md transition focus:bg-zinc-100"
					value={inputValue}
					onBlur={handleBlur}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			) : (
				<>
					<input
						className="accent-zinc-900 w-4 h-4 cursor-pointer"
						type="checkbox"
						id={todo.id}
						checked={!todo.isActive}
						onChange={() => toggleTodo(todo.id)}
					/>
					<label
						className={`flex-1 cursor-pointer transition ${!todo.isActive && 'line-through text-zinc-400'}`}
						htmlFor={todo.id}
					>
						{todo.title}
					</label>
				</>
			)}

			{isEditing ? (
				<>
					<button
						className={`${todo.isActive ? 'text-black' : 'text-white'} transition hover:text-green-400 cursor-pointer`}
						title="Save a new todo title"
						onClick={commit}
					>
						<Save size={18} />
					</button>

					<button
						className={`${todo.isActive ? 'text-black' : 'text-white'} transition hover:text-red-400 cursor-pointer`}
						title="Cancel"
						onMouseDown={e => {
							e.preventDefault()
							cancel()
						}}
					>
						<X size={18} />
					</button>
				</>
			) : (
				<>
					<button
						className={`${todo.isActive ? 'text-black' : 'text-white'} transition hover:text-blue-400 cursor-pointer`}
						title="Edit a todo"
						onClick={handleEdit}
					>
						<Edit size={18} />
					</button>

					<button
						onClick={() => deleteTodo(todo.id)}
						className={`${todo.isActive ? 'text-black' : 'text-white'} transition hover:text-red-400 cursor-pointer`}
						title="Delete a todo"
					>
						<Trash size={18} />
					</button>
				</>
			)}
		</li>
	)
}

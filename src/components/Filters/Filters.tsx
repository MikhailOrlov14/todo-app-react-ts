import { useTodos } from '../../context/useTodos'
import { FilterButton } from '../FilterButton/FilterButton'

export const Filters = () => {
	const { todosQuantity } = useTodos()

	return (
		<div className="flex gap-2 mb-5">
			<FilterButton text="All" filterValue="all" quantity={todosQuantity.all} />
			<FilterButton
				text="Active"
				filterValue="active"
				quantity={todosQuantity.active}
			/>
			<FilterButton
				text="Completed"
				filterValue="completed"
				quantity={todosQuantity.completed}
			/>
		</div>
	)
}

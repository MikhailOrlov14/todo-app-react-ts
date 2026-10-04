import { FilterButton } from '../FilterButton/FilterButton'

export const Filters = () => {
	return (
		<div className="flex gap-2 mb-5">
			<FilterButton text="All" filterValue="all" />
			<FilterButton text="Active" filterValue="active" />
			<FilterButton text="Completed" filterValue="completed" />
		</div>
	)
}

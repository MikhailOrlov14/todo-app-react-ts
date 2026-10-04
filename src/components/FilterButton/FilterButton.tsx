import { useTodos } from '../../context/useTodos'
import type { IFilterButtonProps } from './props'

export const FilterButton = ({ text, filterValue }: IFilterButtonProps) => {
	const { filter, setFilter } = useTodos()

	const isActive = filterValue === filter

	return (
		<button
			className={`flex-1 flex justify-center items-center h-8 border border-black rounded-md  
      ${!isActive ? 'transition hover:bg-black hover:text-white cursor-pointer' : 'bg-black text-white'}`}
			data-filter={filter}
			type="button"
			onClick={() => setFilter(filterValue)}
		>
			{text}
		</button>
	)
}

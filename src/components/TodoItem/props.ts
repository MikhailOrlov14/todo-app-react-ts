export type TTodoId = string

export interface ITodo {
	id: TTodoId
	title: string
	isActive: boolean
}

export interface ITodoProps {
	todo: ITodo
}

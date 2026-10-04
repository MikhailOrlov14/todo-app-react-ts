import { createContext } from 'react'
import { type ITodoContext } from '.'

export const TodoContext = createContext<ITodoContext | null>(null)

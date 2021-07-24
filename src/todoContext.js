import { createContext  } from "react"

export const TodoContext = createContext([{ id: "todo1", text: "todo1", completed: false }])
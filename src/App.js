import React, { useReducer, useState } from "react"
import TodoListPage from "./pages/TodoListPage"
import { ThemeContext } from "./themeContext"
import { TodoContext } from "./todoContext"

const App = () => {
  const initTodos =[ 
    { 
      id: "Complete online JavaScript course",
      text: "Complete online JavaScript course",
      completed: true 
    },
    { 
      id: "Jog around the park 3x",
      text: "Jog around the park 3x",
      completed: false
    },
    { 
      id: "10 minutes meditation",
      text: "10 minutes meditation",
      completed: false 
    },
    { 
      id: "Read for 1 hour",
      text: "Read for 1 hour",
      completed: false 
    },
    { 
      id: "Pick up groceries",
      text: "Pick up groceries",
      completed: false 
    },
    { 
      id: "Complete Todo App on Frontend Mentor",
      text: "Complete Todo App on Frontend Mentor",
      completed: false 
    }
  ]
  
  const [ theme, setTheme ] = useState("light")
  const [ todos, dispatch ] = useReducer((state, action) => {
    switch (action.type) {
      case "create":
        return [...state, { id: action.payload, text: action.payload, completed: false } ]
      case "delete":
        return state.filter(todo => todo.id !== action.payload)
      case "changeStatus":
        return state.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed} : todo)
      case "remakeAfterSwap":
        console.log(state[action.payload.source])
        console.log(state[action.payload.destination])
        const res = [ ...state ]
        res.splice(action.payload.source, 1)
        res.splice(action.payload.destination, 0, state[action.payload.source])
        return res
      default:
        throw new Error()
    }
  }, initTodos)



  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <TodoContext.Provider value={{todos, dispatch}}>
        <TodoListPage/>
      </TodoContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App

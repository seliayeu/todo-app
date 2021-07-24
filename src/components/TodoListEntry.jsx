import React, { useContext } from 'react'
import crossIcon from "../resources/icon-cross.svg"
import TodoRow from './TodoRow'
import CircleCheckbox from './CircleCheckbox'
import { TodoContext } from '../todoContext'
import { ThemeContext } from '../themeContext'
import { Draggable} from 'react-beautiful-dnd'

const styles = { 
    crossButton: {
        marginRight: "1.5rem",
        border: "none",
        backgroundColor: "transparent",
        marginLeft: "auto",
        backgroundImage: `url(${crossIcon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: ".9rem .9rem",
        width: "1rem",
        height: "1rem",
        padding: "none",
        cursor: "pointer"
    },
    entryText: {
        marginLeft: "1rem",
        padding: "none",
        margin: "none"
    },
    lightEntryStyles: {
        borderBottom: "solid",
        borderWidth: "1px",
        borderColor: "hsl(233, 11%, 84%)",
        padding: ".5rem 0 .5rem 0"
    },
    darkEntryStyles: {
        borderBottom: "solid",
        borderWidth: "1px",
        borderColor: "hsl(233, 14%, 35%)",
        padding: ".5rem 0 .5rem 0"
    },
    lightStrikedText: {
        marginLeft: "1rem",
        padding: "none",
        margin: "none",
        color: "hsl(233, 11%, 84%)",
        textDecoration: "line-through"
    },
    darkStrikedText: {
        marginLeft: "1rem",
        padding: "none",
        margin: "none",
        color: "hsl(233, 14%, 35%)",
        textDecoration: "line-through"
    }
}

const TodoListEntry = ({ todo, index }) => {
    const { dispatch } = useContext(TodoContext)
    const { theme } = useContext(ThemeContext)

    const deleteTodo = (event) => {
        event.preventDefault()
        dispatch({ type: "delete", payload: todo.id })
    }

    const changeTodoStatus = (event) => {
        event.preventDefault()
        dispatch({ type: "changeStatus", payload: todo.id })
    }

    return (
        <Draggable draggableId={todo.id} index={index}>
            { (provided, snapshot) =>
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                <TodoRow extraStyles={ theme === "light" ? styles.lightEntryStyles : styles.darkEntryStyles}
                isDragging={snapshot.isDragging}
                >
                    <CircleCheckbox onClick={changeTodoStatus} checked={todo.completed} />
                    <p
                        style={ todo.completed ? (theme === "light" ? styles.lightStrikedText : styles.darkStrikedText ) : styles.entryText}
                    >
                        {todo.text}
                    </p>
                    <button style={styles.crossButton} onClick={deleteTodo}></button>
                </TodoRow>
                </div>
            }
        </Draggable>
    )   
}

export default TodoListEntry
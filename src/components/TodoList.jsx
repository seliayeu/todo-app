import React, { useContext, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { ThemeContext } from '../themeContext'
import { TodoContext } from '../todoContext'
import useWindowDimensions from '../util/windowDimensions'
import NewTodo from './NewTodo'
import TodoListEntry from './TodoListEntry'
import TodoRow from './TodoRow'
import TodoSorter from './TodoSorter'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const useStyles = createUseStyles({
    lightClearButton: {
        marginLeft: "auto",
        cursor: "pointer",
        color: "hsl(236, 9%, 61%)",
        "&:hover": {
            color: "hsl(235, 19%, 35%)"
        },
        marginRight: "2rem"
    },
    darkClearButton: {
        marginLeft: "auto",
        cursor: "pointer",
        color: "hsl(234, 11%, 52%)",
        "&:hover": {
            color: "hsl(236, 33%, 92%)"
        },
        marginRight: "2rem"
    }
})

const styles = {
    lightListBox: {
        borderRadius: "5px",
        overflow: "hidden",
        margin: "1.5rem 0 1.5rem 0",
        boxShadow: "0px 6rem 80px 15px hsl(236, 9%, 92%)",
        backgroundColor: "white",
    },
    darkListBox: {
        borderRadius: "5px",
        overflow: "hidden",
        margin: "1.5rem 0 1.5rem 0",
        boxShadow: "0px 6rem 80px 15px hsl(234, 20%, 10%)",
        backgroundColor: "hsl(235, 24%, 19%)",
    },
    footer: {
        fontFamily: "Josefin Sans",
        justifyContent: "center",
    },
    footerText: {
        margin: "0 1.5rem 0 1.5rem"
    },
    entryContainer: {
        width: "100%"
    },
    infoText: {
        color: "hsl(234, 11%, 52%)",
        fontFamily: "Josefin Sans",
        fontSize: ".85rem",
        marginTop: "1rem"
    },
    darkButtonContainer: {
        justifyContent: "center",
        borderRadius: "5px",
        padding: "1rem 0 1rem 0",
        boxShadow: "0px .3rem 80px 15px hsl(234, 20%, 10%)",
        marginBottom: "1rem"
    },
    lightButtonContainer: {
        justifyContent: "center",
        borderRadius: "5px",
        padding: "1rem 0 1rem 0",
        boxShadow: "0px .3rem 80px 15px hsl(236, 9%, 92%)",
        marginBottom: "1rem"
    },
    itemsLeftText: {
        marginRight: "auto",
        color: "hsl(236, 9%, 61%)"
    },
    darkItemsLeftText: {
        marginRight: "auto",
        color: "hsl(234, 11%, 52%)"
    },
    clearButton: {
        marginLeft: "auto",
        cursor: "pointer",
    },
    darkClearButton: {
        marginLeft: "auto",
        cursor: "pointer",
        color: "hsl(236, 9%, 61%)",
    },
    lightDesktopShadow: {
        boxShadow: "0px 6rem 80px 10px hsl(236, 9%, 95%)",
    },
    darkDesktopShadow: {
        boxShadow: "0px 6rem 50px 10px hsl(234, 20%, 10%)"
    }
}

const TodoList = () => {
    const { width } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    const { todos, dispatch } = useContext(TodoContext)
    const [ sorting, setSorting ] = useState("all")
    const classes = useStyles()

    const onDragEnd = (result) => {
        const { destination, source } = result;
        
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        dispatch({ type: "remakeAfterSwap", payload: { source: source.index, destination: destination.index }})
    }

    return (
        <div style={{ width: "100%" }}>
            <NewTodo/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{
                    ...( theme === "light" ? styles.lightListBox : styles.darkListBox ), 
                    ...(width >= 600 ? ( theme === "light" ? styles.lightDesktopShadow : styles.darkDesktopShadow ) : {} )}}>
                        <Droppable droppableId="0">
                        { provided =>
                        <div style={styles.entryContainer} {...provided.droppableProps} ref={provided.innerRef}>
                            { todos.map( (todo, index) => (
                                sorting === "all" ? 
                                    <TodoListEntry todo={todo} key={todo.id} index={index} /> 
                                :
                                    sorting === "completed" ? 
                                        todo.completed === true ? <TodoListEntry index={index} todo={todo} key={todo.id} /> : <></>
                                    : 
                                        todo.completed === false ? <TodoListEntry todo={todo} index={index} key={todo.id} /> : <></>
                            ))}
                            {provided.placeholder}
                        </div>
                        }
                        </Droppable>
                    <TodoRow extraStyles={styles.footer}>
                        <div style={{...styles.footerText, ...( theme === "light" ? styles.itemsLeftText : styles.darkItemsLeftText)}}>
                            {todos.reduce((acc, cur) => !cur.completed ? acc + 1 : acc, 0)} items left
                        </div>
                        { width >= 600 ?  <TodoSorter sorting={sorting} setSorting={setSorting} /> : <> </>}
                        <div className={ theme === "light" ? classes.lightClearButton : classes.darkClearButton}>Clear Completed</div>   
                    </TodoRow>
                </div>
            </DragDropContext>
            
            { width < 600 ? 
                <TodoRow extraStyles={ theme === "light" ? styles.lightButtonContainer : styles.darkButtonContainer}>
                    <TodoSorter sorting={sorting} setSorting={setSorting} />
                </TodoRow>
                :
                <></>
            }
            <div style={{ display: "flex", justifyContent: "center"}}>
                <p style={styles.infoText}>Drag and drop to reorder list</p>
            </div>
        </div>
    )   
}

export default TodoList
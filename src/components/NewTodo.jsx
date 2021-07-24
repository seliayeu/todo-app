import React, { useContext, useState } from 'react'
import CircleCheckbox from './CircleCheckbox'
import TodoRow from './TodoRow'
import { createUseStyles } from 'react-jss'
import { ThemeContext } from '../themeContext'
import { TodoContext } from '../todoContext'

const useStyles = createUseStyles({
    lightFormInput: {
        border: "none",
        fontFamily: "Josefin Sans",
        fontSize: ".9rem",
        marginLeft: "1rem",
        outline: "none",
        width: "90%",
        height: "100%",
    },
    darkFormInput: {
        color: "hsl(234, 39%, 85%)",
        border: "none",
        fontFamily: "Josefin Sans",
        fontSize: ".9rem",
        marginLeft: "1rem",
        outline: "none",
        width: "90%",
        height: "100%",
        backgroundColor: "#25273C",
        "&::placeholder": {
            color: "hsl(234, 11%, 52%)"
        }
    },
    form: {
        width: "100%",
        height: '100%'
    }
})


const NewTodo = () => {
    const classes = useStyles()
    const { theme } = useContext(ThemeContext)
    const { dispatch } = useContext(TodoContext)
    const [ formText, setFormText ] = useState("")

    const createTodo = (event) => {
        event.preventDefault()
        dispatch({ type: "create", payload: formText })
        setFormText("")
    }

    return (
        <TodoRow extraStyles={{ borderRadius: "5px" }}>
            <CircleCheckbox/>
            <form onSubmit={createTodo} className={classes.form}>
                <input 
                    name="todo" 
                    className={ theme === "light" ? classes.lightFormInput : classes.darkFormInput} 
                    placeholder="Create a new todo..."
                    value={formText}
                    onChange={(event) => {setFormText(event.target.value)}}
                />
            </form>
        </TodoRow>
    )   
}

export default NewTodo
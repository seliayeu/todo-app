import React, { useContext } from "react"
import { createUseStyles } from "react-jss"
import { ThemeContext } from "../themeContext"

const useStyles = createUseStyles({
    selectedText: {
        color: "hsl(220, 98%, 61%)",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: ".9rem",
        margin: "0 .6rem 0 .6rem",
    },
    darkText: {
        fontWeight: "700",
        fontSize: ".9rem",
        margin: "0 .6rem 0 .6rem",
        color: "hsl(234, 11%, 52%)",
        cursor: "pointer",
        "&:hover": {
            color: "hsl(236, 33%, 92%)"
        }
    },
    lightText: {
        fontWeight: "700",
        fontSize: ".9rem",
        margin: "0 .6rem 0 .6rem",
        color: "hsl(236, 9%, 61%)",
        cursor: "pointer",
        "&:hover": {
            color: "hsl(235, 19%, 35%)"
        }
    }
})

const TodoSorter = ({ sorting, setSorting }) => {
    const classes = useStyles()
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <div 
                className={sorting === "all" ? classes.selectedText : ( theme === "light" ? classes.lightText : classes.darkText)}
                onClick={(e) => { e.preventDefault(); setSorting("all")}}
            >
                All
            </div>
            <div 
                className={sorting === "active" ? classes.selectedText : ( theme === "light" ? classes.lightText : classes.darkText)}
                onClick={(e) => { e.preventDefault(); setSorting("active")}}
            >
                Active
            </div>
            <div 
                className={sorting === "completed" ? classes.selectedText : ( theme === "light" ? classes.lightText : classes.darkText)}
                onClick={(e) => { e.preventDefault(); setSorting("completed")}}
            >
                Completed
            </div>
        </>
    )
}

export default TodoSorter
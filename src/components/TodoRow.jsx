import React, { useContext } from "react"
import { ThemeContext } from "../themeContext"

const styles = {
    lightRow: {
        backgroundColor: "white",
        color: "hsl(235, 19%, 35%)",
        fontFamily: "Josefin Sans",
        fontWeight: "400px",
        fontSize: ".9rem",
        padding: "1rem 0rem 1rem 0rem",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        boxSizing: "border-box",
    },
    darkRow: {
        backgroundColor: "hsl(235, 24%, 19%)",
        color: "hsl(234, 39%, 85%)",
        fontFamily: "Josefin Sans",
        fontWeight: "400px",
        fontSize: ".9rem",
        padding: "1rem 0rem 1rem 0rem",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        boxSizing: "border-box",
    },
    onDrag: {
        borderRadius: "5px"
    }
}

const TodoRow = ({ children, extraStyles, isDragging }) => {
    const { theme } = useContext(ThemeContext)

    return(
        <div style={{...(theme === "light" ? styles.lightRow : styles.darkRow), ...extraStyles, ...(isDragging ? styles.onDrag : {})} }>
            {children}
        </div>
    )
}

export default TodoRow
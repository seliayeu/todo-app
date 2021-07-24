import React, { useContext } from "react"
import { createUseStyles  } from "react-jss"
import checkIcon from "../resources/icon-check.svg"
import { ThemeContext } from "../themeContext"

const useStyles = createUseStyles({
    checkboxForeground: {
        borderRadius: "8rem",
        borderStyle: "solid",
        borderWidth: "1px",
        padding: "none",
        width: "1.3rem",
        height: "1.3rem",
        backgroundColor: "white",
        borderColor: "hsl(233, 11%, 84%)",
        position: "absolute",
        "&:hover": {
            borderRadius: "8rem",
            width: "calc(1.25rem - 1px)",
            height: "calc(1.25rem - 1px)",
            backgroundClip: "padding-box",
            borderColor: "transparent",
            borderSize: "2px",
            paddingLeft: "1.8px",
            paddingTop: "1.8px"
        },
        cursor: "pointer"
    },
    activeCheckboxForeground: {
        backgroundImage: `url(${checkIcon})`,
        borderRadius: "5rem",
        backgroundSize: ".6rem .6rem",
        backgroundRepeat: "no-repeat",
        padding: "none",
        width: "1.3rem",
        height: "1.3rem",
        backgroundPosition: "right 4px bottom 4px",
        position: "absolute",
        cursor: "pointer"
    },
    checkboxBackground: {
        backgroundImage: "linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        backgroundPosition: "center",
        backgroundSize: "1.5rem 1.5rem",
        width: "1.3rem",
        height: "1.3rem",
        borderRadius: "8rem",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "transparent",
        padding: "none"
    },
    checkbox: {
        position: "relative",
        marginLeft: "1.5rem",
        marginBottom: ".01rem",
    },
    darkCirlceCheckbox: {
        backgroundColor: "#25273C",
        borderColor: "hsl(234, 11%, 52%)"
    }
})

const CircleCheckbox = ({ onClick, checked }) => {
    const classes = useStyles()
    const { theme } = useContext(ThemeContext)

    return (
        <div className={classes.checkbox} onClick={onClick}>
            <div className={`${checked ? classes.activeCheckboxForeground : classes.checkboxForeground} ${theme === "dark" && !checked ? classes.darkCirlceCheckbox : "" }`}></div>
            <div className={classes.checkboxBackground}></div>
        </div>
    )
}

export default CircleCheckbox
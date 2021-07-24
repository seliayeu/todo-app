import React, { useContext } from "react"
import useWindowDimensions from "../util/windowDimensions"
import TodoList from "../components/TodoList"
import mobileBackgroundDark from '../resources/bg-mobile-dark.jpg'
import desktopBackgroundDark from '../resources/bg-desktop-dark.jpg'
import mobileBackgroundLight from '../resources/bg-mobile-light.jpg'
import desktopBackgroundLight from '../resources/bg-desktop-light.jpg'
import sunIcon from '../resources/icon-sun.svg'
import moonIcon from '../resources/icon-moon.svg'
import { ThemeContext } from "../themeContext"

const styles = {
    background: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    header: {
        fontFamily: "Josefin Sans",
        fontWeight: "700",
        color: "white",
        letterSpacing: "13px"
    },
    headerRow: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    moonButton: {
        backgroundImage: `url(${moonIcon})`,
        backgroundColor: "transparent",
        backgroundPosition:"center",
        width: "30px",
        height: "30px",
        border: "none",
        backgroundRepeat: "no-repeat",
        marginRight: "none"
    },
    sunButton: {
        backgroundImage: `url(${sunIcon})`,
        backgroundColor: "transparent",
        backgroundPosition:"center",
        width: "30px",
        height: "30px",
        border: "none",
        backgroundRepeat: "no-repeat",
        marginRight: "none"
    },
    mainBlock: {
        maxWidth: "550px",
        minWidth: "260px",
        width: "90%",
        marginTop: "5%"
    }
}

const mobileStyles = {
    darkBackground: {
        backgroundColor: "hsl(235, 21%, 11%)",
        backgroundImage: `url(${mobileBackgroundDark})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "100% 27%"
    },
    lightBackground: {
        backgroundColor: "hsl(0, 0%, 98%)",
        backgroundImage: `url(${mobileBackgroundLight})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "100% 27%",
    },
}

const desktopStyles = {
    darkBackground: {
        backgroundColor: "hsl(235, 21%, 11%)",
        backgroundImage: `url(${desktopBackgroundDark})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "100% 30%"
    },
    lightBackground: {
        backgroundColor: "hsl(0, 0%, 98%)",
        backgroundImage: `url(${desktopBackgroundLight})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "100% 30%"        
    },
}

const TodoListPage = () => {
    const { width } = useWindowDimensions()
    const { theme, toggleTheme } = useContext(ThemeContext)


    return (
        <div 
            style={{
                ...styles.background, 
                ...(theme === "light" ? 
                    (width > 600 ? desktopStyles.lightBackground : mobileStyles.lightBackground) :
                    (width > 600 ? desktopStyles.darkBackground : mobileStyles.darkBackground)),
            }}>
            <div style={styles.mainBlock}>
                <div style={styles.headerRow}>
                <h1 style={styles.header}>TODO</h1>
                   <button 
                        style={theme === "light" ? styles.moonButton : styles.sunButton} 
                        onClick={(e) => { e.preventDefault(); toggleTheme() }}
                    >    
                    </button>
                </div>
                <TodoList />
            </div>
        </div>
    )
}

export default TodoListPage 
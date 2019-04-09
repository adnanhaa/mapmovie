import ThemeContext from "./Theme";
import React from "react";

function SwitchTheme() {
    return (
        <ThemeContext.Consumer>
            {({theme, switchTheme}) => (
                <div
                    onClick={switchTheme}
                    style={{backgroundColor: theme.background}}>
                    Switch Theme
                </div>
            )}
        </ThemeContext.Consumer>
    )
}

export default SwitchTheme;
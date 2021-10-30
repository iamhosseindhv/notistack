import { SnackbarProvider, useSnackbar } from "notistack";
import "./styles.css";
import ThemeResponsiveSnackbar from "./ThemeResponsiveSnackbar";
import { createContext, useContext, useState } from "react";

const Child = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <button
            style={{ margin: "0 16px" }}
            onClick={() => enqueueSnackbar("I like snackbars")}
        >
            Show snackbar
        </button>
    );
};

const ThemeProvider = createContext<string>("");
export const useTheme = () => useContext(ThemeProvider);

export default function App() {
    const [themeType, toggleTheme] = useState("dark");

    const handleToggleTheme = () => {
        toggleTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider.Provider value={themeType}>
            <SnackbarProvider
                Components={{
                    default: ThemeResponsiveSnackbar,
                    success: ThemeResponsiveSnackbar,
                    error: ThemeResponsiveSnackbar,
                    warning: ThemeResponsiveSnackbar
                }}
            >
                <div
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: themeType === "light" ? "white" : "black"
                    }}
                >
                    <Child />
                    <button onClick={handleToggleTheme}>
                        Toggle theme to {themeType}
                    </button>
                </div>
            </SnackbarProvider>
        </ThemeProvider.Provider>
    );
}

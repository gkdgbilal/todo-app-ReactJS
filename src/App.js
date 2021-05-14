import Main from "./layout/Main";
import Header from "./layout/Header";
import {BrowserRouter as Router} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {unstable_createMuiStrictModeTheme as createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import Login from "./pages/Login";
import {deepOrange, green} from "@material-ui/core/colors";

// const darkTheme = createMuiTheme({
//     palette: {
//         type: 'dark',
//         primary: {
//             main: green['A200']
//         },
//         secondary: {
//             main: deepOrange['500']
//         }
//     },
// });

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

export const AuthContext = createContext({})

const hasToken = () => {
    return localStorage.getItem("access_token")
}


function App() {
    const classes = useStyles();
    const [auth, setAuth] = useState({isAuth: false})

    useEffect(() => {
        const token = hasToken()
        if (token) {
            const decodedJwt = jwtDecode(token);
            const currentTime = Date.now().valueOf() / 1000;
            setAuth({isAuth: decodedJwt.exp > currentTime})
        }
    }, [])
    return (<AuthContext.Provider value={{auth, setAuth}}>
            <CssBaseline/>
            {!auth.isAuth ? <Login/> :
                <Router>
                    <div className={classes.root}>
                        <Header/>
                        <Main/>
                    </div>
                </Router>
            }
        </AuthContext.Provider>
    );
}

export default App;

import Main from "./layout/Main";
import Header from "./layout/Header";
import {BrowserRouter as Router} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

function App() {
    const classes = useStyles();
    return <Router>
        <div className={classes.root}>
            <Header/>
            <Main/>
        </div>
    </Router>
}

export default App;

import {Route, Switch} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
import Todos from "../pages/Todos";
import AddTodo from "../pages/AddTodo";
import EditTodo from "../pages/EditTodo";


const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

export default function Main() {
    const classes = useStyles();
    return <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="xl" className={classes.container}>
            <Switch>
                <Route exact path="/">
                    <Todos/>
                </Route>
                <Route path="/todos">
                    <AddTodo/>
                </Route>
                <Route path="/edit/:id">
                    <EditTodo/>
                </Route>
            </Switch>
        </Container>
    </main>
}
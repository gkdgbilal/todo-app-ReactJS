import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar, Button, Checkbox,
    Container, FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {EditTwoTone, SyncTwoTone} from "@material-ui/icons";
import {useFormik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import React, {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formElement: {
        marginTop: '1.25rem',
        flex: 'center'
    },
}));
const validationSchema = yup.object({
    title: yup.string('enter todo title').required('title is required'),
    description: yup.string('enter todo description').required('description is required')
})

export default function EditTodo() {
    const editValue = useParams()
    const classes = useStyles();
    const [todos, setTodos] = useState([])
    const history = useHistory();
    let ignored = false
    const formik = useFormik({
        initialValues: {
            // id: todos.id,
            title: "",
            description: "",
            completed: null
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            // axios.put('http://localhost:8000/v1/todos', {...values})
            //     .then(res => {
            //         setTodos(prevState => prevState.map(todo => (todo.id === res.data.id ? {
            //             ...todo,
            //             id: res.data.id,
            //             title: res.data.title,
            //             description: res.data.description,
            //             completed: res.data.completed
            //         } : todo)))
            //     })
            //     .catch((error) => {
            //         if (error.response) {
            //             actions.setStatus({error: error.response.data.message})
            //             return
            //         }
            //         actions.setStatus({error: error.toString()})
            //     }).finally(() => {
            //     history.push("/")
            // })

            axios({
                method: 'put',
                url: 'http://localhost:8000/v1/todos',
                data: {
                    id: editValue.id,
                    title: values.title,
                    description: values.description,
                    completed: values.completed
                },
            }).then(() => {
                history.push("/")
            }).catch((error) => {
                if (error.response) {
                    actions.setStatus({error: error.response.data.message})
                    return
                }
                actions.setStatus({error: error.toString()})
            })
        },
    });

    useEffect(() => {
        async function readTodos() {
            axios({
                method: 'get',
                url: `http://localhost:8000/v1/todos/${editValue.id}`
            }).then((response) => {
                setTodos(response.data)
                console.log(response.data)
            }).catch((error) => {
                if (error.response) {
                    return
                }
            });
        }

        !ignored && readTodos();
        return () => {
            ignored = true
        }
    }, []);

    // const [state, setState] = React.useState({
    //     checked: todos.completed
    // });
    //
    // const handleChange = (event) => {
    //     setState({...state, [event.target.name]: event.target.checked});
    //     console.log(state)
    // };

    const [isTrue, setIsTrue] = React.useState(todos.completed)
    return <>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditTwoTone/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Todo
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
                    {formik.status && formik.status.error &&
                    <Alert className={classes.formElement} severity="error">{formik.status.error}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formElement}
                                variant="outlined"
                                fullWidth
                                id="id"
                                label={editValue.id}
                                name="id"
                                autoComplete="id"
                                value={editValue.id}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formElement}
                                variant="outlined"
                                fullWidth
                                id="title"
                                label={todos.title}
                                name="title"
                                autoComplete="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formElement}
                                variant="outlined"
                                fullWidth
                                name="description"
                                label={todos.description}
                                id="description"
                                autoComplete="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    // <Checkbox
                                    //     // checked={state.checked}
                                    //     // onChange={() => {
                                    //     //     handleChange()
                                    //     // }}
                                    //     name="checked"
                                    //     color="primary"
                                    // />
                                    <Checkbox
                                        checked={todos.completed}
                                        onChange={
                                            (e) => {
                                                console.log("target checked? - ", e.target.checked)
                                                setIsTrue(e.target.checked)
                                            }
                                        }
                                        value={todos.completed}
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />
                                }
                                label={todos.completed}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.formElement}
                    >
                        Update
                        <SyncTwoTone/>
                    </Button>
                </form>
            </div>
        </Container>
    </>
}
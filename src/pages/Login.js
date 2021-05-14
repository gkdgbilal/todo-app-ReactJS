import React, {useContext} from "react";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid, Link,
    TextField,
    Typography
} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import * as yup from 'yup';
import {useFormik} from "formik";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import {AuthContext} from "../App";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = yup.object({
    username: yup.string('enter your username').required('username is required'),
    password: yup.string('enter your password').required('username is password')
})


export default function Login() {
    const classes = useStyles();
    const history = useHistory()
    const {setAuth} = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            axios({
                method: 'post',
                url: 'http://localhost:8000/v1/log-in',
                data: values
            }).then((response) => {
                localStorage.setItem("access_token", response.data.token)
                setAuth({isAuth: true})
                console.log(response)
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

    return <>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate
                      onSubmit={formik.handleSubmit}
                >
                    {formik.status && formik.status.error &&
                    <Alert className={classes.formElement} severity="error">{formik.status.error}</Alert>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    </>
}
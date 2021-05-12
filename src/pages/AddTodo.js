import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar, Button,
    Container,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {Assignment, CheckBox, Save, SaveAlt} from "@material-ui/icons";
import {useFormik} from "formik";
import * as yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Alert} from "@material-ui/lab";

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
        marginTop: '1.25rem'
    },
}));
const validationSchema = yup.object({
    title: yup.string('enter todo title').required('title is required'),
    description: yup.string('enter todo description').required('description is required')
})

export default function AddTodo() {
    const classes = useStyles();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            axios({
                method: 'post',
                url: 'http://localhost:8000/todos',
                data: values
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

    return <>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Assignment/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Todo
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
                                id="title"
                                label="Title"
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
                                label="Description"
                                id="description"
                                autoComplete="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
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
                        Save
                        <Save/>
                    </Button>
                </form>
            </div>
        </Container>
    </>
}
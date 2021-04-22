import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { useHistory } from "react-router-dom";
import { sendFormInfoUser } from '../services/userServices'
import * as yup from 'yup';
import { Formik } from 'formik';

export interface sendFormAuth {
    Login: string,
    Password: string,
}

function Auth() {
    const style = useStyles()
    let history = useHistory()

    const sendForm = async (values: sendFormAuth) => {

        const response = await sendFormInfoUser({
            login: values.Login,
            password: values.Password,
            typeRequest: 'auth',
        })
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('login', values.Login)
            history.push("/todo/app")
            history.go(0)
        }
    }

    const validationsShema = yup.object().shape({
        Login: yup.string().typeError('Must have string').min(6, "Login should have a minimum 6 symbols").required('Login is required filed'),
        Password: yup.string().typeError('Must have string').min(6, "Password should have a minimum6 symbols").required('Password is required filed'),
    })

    return (
        <Formik
            initialValues={{
                Login: "",
                Password: ""
            }}
            validateOnBlur
            onSubmit={(values => {  })}
            validationSchema={validationsShema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                return (
                    (
                        <Container fixed className={style.container}>
                            <FormGroup className={style.form}>
                                <h1>SIGN IN</h1>
                                <TextField
                                    id="standard-basic"
                                    label="Login"
                                    name={'Login'}
                                    type={'text'}
                                    className={style.input}
                                    value={values.Login}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Box>
                                    {touched.Login && errors.Login && <p className={style.errors}> {errors.Login}</p>}
                                </Box>
                                <TextField
                                    id="filled-password-input"
                                    label="Password"
                                    name={'Password'}
                                    type="password"
                                    className={style.input}
                                    value={values.Password}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Box>
                                    {touched.Password && errors.Password && <p className={style.errors}> {errors.Password}</p>}
                                </Box>

                                <Box component="span" m={1} className={style.box}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => sendForm(values)}
                                        disabled={!isValid && !dirty}>
                                        Sign In
                                    </Button>
                                    <Link href='http://localhost:3000/todo/reg'>Sign Up</Link>
                                </Box>
                            </FormGroup>
                        </Container>
                    )
                )
            }
            }
        </Formik>
    )
}


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center'

    },
    form: {
        width: "500px",
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: "500px",
        margin: '15px 0px',
    },
    box: {
        width: '200px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    errors: {
        color: '#B22222',
        marginTop: '1px',
        fontSize: '14px'
    },
}));


export default Auth
import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import deepEqual from "lodash.isequal"

import { sendFormInfoUser } from '../services/userServices'
import { useHistory } from "react-router-dom";

function Register() {
    const style = useStyles()

    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const [err, setErr] = useState(false)

    let history = useHistory()

    const sendForm = async () => {
        // console.log('asdasfafasfafafasf')
        const response = await sendFormInfoUser({
            login: login,
            password: password,
            email: email,
            typeRequest: 'reg'
        })

        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('login', login)
            history.push("/todo/app")
            history.go(0)
        }
    }

    return (
        <Formik
            initialValues={{
                login: '',
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                login: Yup.string()
                    .required('Login is required')
                    .min(5, 'Login must be at least 5 characters'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(2, 'Password must be at least 2 characters')
                    .required('Password is required'),
            })}
            onSubmit={() => {
                sendForm()
            }}
            render={({ errors, touched, handleSubmit, handleBlur, values, initialValues }) => {

                console.log(errors)


                8bd5b449e51da73aa5901eb2e120b494ab3b48f7
                return (
                    <Container fixed className={style.container}>
                        <Form className={style.form} onSubmit={handleSubmit} >
                            <h1>SIGN UP</h1>

                            <div className={style.div}>
                                <label htmlFor="login" className={style.label}>Login</label>
                                <Field
                                    name="login"
                                    type="text"
                                    id="filled-login-input"
                                    label="Login"
                                    className={`${style.input} ${(errors.login ? style.errorInput : '')}`}
                                    value={login}
                                    onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => {
                                        setLogin(event.target.value)
                                    }}
                                    onBlur={(event: any) => console.log(event)}
                                />
                                <ErrorMessage name="login" component="TextField" className={style.errorMessage} />
                            </div>
                            <div className={style.div}>
                                <label htmlFor="email" className={style.label}>Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    id="filled-email-input"
                                    label="Email"
                                    className={`${style.input} ${(errors.login && touched.login ? style.errorInput : '')}`}
                                    value={email}
                                    onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => {
                                        setEmail(event.target.value)
                                    }}
                                    onBlur={(event: any) => console.log(event)}
                                />
                                <ErrorMessage name="email" component="TextField" className={style.errorMessage} />
                            </div>

                            <div className={style.div}>
                                <label htmlFor="password" className={style.label}>Password</label>
                                <Field
                                    name="password"
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    className={`${style.input} ${(errors.login && touched.login ? style.errorInput : '')}`}
                                    value={password}
                                    onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => {
                                        setPassword(event.target.value)
                                    }}
                                    onBlur={(event: any) => console.log(event)}
                                />
                                <ErrorMessage name="password" component="TextField" className={style.errorMessage} />
                            </div>
                            <Box component="span" m={1} className={style.box}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => sendForm()}
                                >
                                    Sign Up
                                </Button>
                                <Link href='http://localhost:3000/todo/auth'>Sign In</Link>
                            </Box>
                        </Form>
                    </Container>
                )
            }
            }
        />
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
        display: 'flex',
        flexDirection: 'column',
        width: "500px",
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginTop: '1px',
        height: '30px',
        width: "500px",
        marginBottom: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        color: '#333',
        paddingLeft: '10px',
        borderColor: '#666',
        borderWidth: '1.5px'
    },
    box: {
        width: '200px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    label: {
        marginTop: '10px',
        marginBottom: '5px'
    },
    errorMessage: {
        color: "#ff0000",
        fontSize: '14px'
    },
    div: {
        marginTop: '5px'
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: '1.5px'
    }
}));


export default Register
import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import { sendFormInfoUser } from '../services/userServices'
import { useHistory } from "react-router-dom";

import * as yup from 'yup';
import { Formik } from 'formik';

export interface sendForm {
    Login: string,
    Email: string,
    Password: string,
}

function Register() {
    const style = useStyles()

    let history = useHistory()

    const sendForm = async (values: sendForm) => {
        console.log(values)
        const response = await sendFormInfoUser({
            login: values.Login,
            password: values.Password,
            email: values.Email,
            typeRequest: 'reg'
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
        Email: yup.string().typeError('Must have string').email('Enter correct email').required('Email is required filed'),
        Password: yup.string().typeError('Must have string').min(6, "Password should have a minimum6 symbols").required('Password is required filed'),
    })

    return (
        <Formik
            initialValues={{
                Login: "",
                Email: "",
                Password: ""
            }}
            validateOnBlur
            onSubmit={(values => { console.log('vvvvvvvvvvvvvvvvvvvvvvv   ' + values) })}
            validationSchema={validationsShema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                return (
                    (
                        <Container fixed className={style.container}>
                            <FormGroup className={style.form}>
                                <h1>SIGN UP</h1>
                                <TextField
                                    id="filled-login-input"
                                    label="Login"
                                    type='text'
                                    name={'Login'}
                                    className={style.input}
                                    value={values.Login}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>
                                    {touched.Login && errors.Login && <p className={style.errors}> {errors.Login}</p>}
                                </p>
                                <TextField
                                    id="filled-email-input"
                                    label="Email"
                                    type='text'
                                    name={'Email'}
                                    className={style.input}
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>
                                    {touched.Email && errors.Email && <p className={style.errors}> {errors.Email}</p>}
                                </p>
                                <TextField
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    name={'Password'}
                                    className={style.input}
                                    value={values.Password}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <p>
                                    {touched.Password && errors.Password && <p className={style.errors}> {errors.Password}</p>}
                                </p>

                                <Box component="span" m={1} className={style.box}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => sendForm(values)}
                                        disabled={!isValid && !dirty}
                                        type={'submit'}>
                                        Sign Up
                                    </Button>
                                    <Link href='http://localhost:3000/todo/auth'>Sign In</Link>
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
        marginBottom: '20px'
    },
    box: {
        width: '200px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    errors: {
        color: 'red'
    }
}));


export default Register
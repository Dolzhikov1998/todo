import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import { sendFormInfoUser } from '../services/userServices'
import { Redirect } from 'react-router';

function Register() {
    const style = useStyles()

    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const sendForm = async () => {
        const response = await sendFormInfoUser({
            login: login,
            password: password,
            email: email,
            typeRequest: 'reg'
        })
        console.log(response.data)

        localStorage.setItem('token', response.data.token)

        if (localStorage.getItem('token')) {
            <Redirect to='/todo/app' />
        }

    }

    return (
        <Container fixed className={style.container}>
            <FormGroup className={style.form}>
                <h1>SIGN UP</h1>
                <TextField
                    id="filled-login-input"
                    label="Login"
                    className={style.input}
                    value={login}
                    onChange={event => {
                        setLogin(event.target.value)
                    }} />
                <TextField
                    id="filled-email-input"
                    label="Email"
                    className={style.input}
                    value={email}
                    onChange={event => {
                        setEmail(event.target.value)
                    }} />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    className={style.input}
                    value={password}
                    onChange={event => {
                        setPassword(event.target.value)
                    }} />

                <Box component="span" m={1} className={style.box}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => sendForm()}>
                        Sign Up
                    </Button>
                    <Link underlineHover href='http://localhost:3000/todo/auth'>Sign In</Link>
                </Box>
            </FormGroup>
        </Container>
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
    }
}));


export default Register
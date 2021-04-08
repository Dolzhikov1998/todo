import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

import { sendFormInfoUser } from '../services/userServices'


function Auth() {
    const style = useStyles()

    const [loginAuth, setLoginAuth] = useState('')
    const [passwordAuth, setPasswordAuth] = useState('')


    const sendForm = async () => {
        const response = await sendFormInfoUser({
            login: loginAuth,
            password: passwordAuth,
            typeRequest: 'auth'
        })
        console.log(response.data.msg)
    }

    return (
        <Container fixed className={style.container}>
            <FormGroup className={style.form}>
                <h1>SIGN IN</h1>
                <TextField
                    id="standard-basic"
                    label="Login"
                    className={style.input}
                    value={loginAuth}
                    onChange={event => {
                        setLoginAuth(event.target.value)
                    }} />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    className={style.input}
                    value={passwordAuth}
                    onChange={event => {
                        setPasswordAuth(event.target.value)
                    }} />

                <Box component="span" m={1} className={style.box}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => sendForm()}>
                        Sign In
                    </Button>
                    <Link underlineHover href='http://localhost:3000/todo/reg'>Sign Up</Link>
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


export default Auth
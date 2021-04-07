import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles';

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
    }
}));


function Register() {
    const style = useStyles()

    return (
        <Container fixed className={style.container}>
            <FormGroup className={style.form}>
                <h1>SIGN UP</h1>
                <TextField id="standard-basic" label="Login" className={style.input} />
                <TextField id="filled-email-input" label="Email" className={style.input} />
                <TextField id="filled-password-input" label="Password" type="password" className={style.input} />

                <Button variant="contained" color="primary">
                    Sign Up
                </Button>
            </FormGroup>

        </Container>
    )
}


export default Register
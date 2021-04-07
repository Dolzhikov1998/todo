import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

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


function Auth() {
    const style = useStyles()

    return (
        <Container fixed className={style.container}>
            <FormGroup className={style.form}>
                <h1>SIGN IN</h1>
                <TextField id="standard-basic" label="Login" className={style.input} />
                <TextField id="filled-password-input" label="Password" type="password" className={style.input} />

                <Box component="span" m={1} className={style.box}>
                    <Button variant="contained" color="primary">
                        Sign In
                    </Button>
                    <Link underlineHover>Sign Up</Link>
                </Box>


            </FormGroup>

        </Container>
    )
}


export default Auth
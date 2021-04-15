import React from 'react'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export interface IAlert {
    err: string
}

const AlertErr  = ({ err }: IAlert) => {
    // console.log(err)
    const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    //   };
    return (
        <>
            {
                open ? (<Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => { setOpen(false) }} >
                    <Alert
                        severity="error"
                        onClose={() => setOpen(false)} >
                        {err}
                    </Alert>
                </Snackbar>) : null
            }
        </>
    )

}

export default AlertErr
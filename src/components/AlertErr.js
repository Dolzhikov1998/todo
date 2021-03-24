import React from 'react'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



export default function AlertErr ({err}){
// console.log(err)
    const [open, setOpen] = React.useState(true);


    // const handleClose = () => {
    //     setOpen(false);
    //   };
    return(
        <Snackbar open={open} 
                    autoHideDuration={3000}  
                    onRequestClose = {() => setOpen(false)} >
            <Alert severity="error">
            {err} 
            </Alert>
        </Snackbar>
    )

}
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function MyPaginations(props){
  const {
    todos,
    handlerPagin
  } = props
    const classes = useStyles();

    const [numberPage, setNumberPage] = useState()

    // function handlerPagin(){
      
    // }

    return(
        <div className={classes.root}>
            <Pagination 
            count={Math.ceil(todos.length/5)}
            onChange = {
              handlerPagin(Math.ceil(todos.length/5))  
            }
           />
        </div>
     )
}

export default MyPaginations
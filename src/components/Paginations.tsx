import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export interface IPagination {
  handlerPagin(e:any, statePagNow: number): void,
  countTodos: number
}

const MyPaginations: React.FunctionComponent<IPagination> = (props) => {
  const {
    handlerPagin,
    countTodos
  } = props

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={countTodos}
        onChange={
          handlerPagin
        }
      />
    </div>
  )
}

export default MyPaginations
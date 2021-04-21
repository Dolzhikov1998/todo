import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export interface PaginationProps {
  handlerPagin(e: any, statePagNow: number): void,
}

const MyPaginations: React.FunctionComponent<PaginationProps> = (props) => {
  const {
    handlerPagin,
  } = props


  const classes = useStyles();
  const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)

  return (
    <div className={classes.root}>
      <Pagination
        page={Objtodos.page === 0 ? 1 : Objtodos.page}
        count={Objtodos.counterPages}
        onChange={handlerPagin}
      />
    </div>
  )
}

export default MyPaginations
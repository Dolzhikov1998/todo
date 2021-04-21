import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'
import { filtersByDate, filtersByDone } from '../redux/TaskRequestAPI';
import { useDispatch } from 'react-redux'
import { addFillterByDate, addFillterByDone } from '../redux/TaskActions';


export interface FiltersTasks {
    statusItem: string,
    currentPage: number,
    statusDone?: string,
    statusDate?: string
}


const Filters = () => {

    const dispatch = useDispatch()

    const objTodo = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers);


    return (
        <div className="containerForFiltersBtn">
            <div>
                <Button variant="outlined" color="primary" onClick={() => {
                    dispatch(addFillterByDone('true'))
                    dispatch(filtersByDone({ statusItem: 'true', currentPage: objTodo.page, statusDate: objTodo.filterDate }))
                }}>
                    Done
            </Button>
                <Button variant="outlined" color="secondary" onClick={() => {
                    dispatch(addFillterByDone('false'))
                    dispatch(filtersByDone({ statusItem: 'false', currentPage: objTodo.page, statusDate: objTodo.filterDate }))
                }}>
                    Undone
            </Button>
                <Button variant="outlined" color="default" onClick={() => {
                    dispatch(addFillterByDone(''))
                    dispatch(filtersByDone({ statusItem: '', currentPage: objTodo.page, statusDate: objTodo.filterDate }))
                }}>
                    All
            </Button>
            </div >

            <span className="arrowContainer">
                <p>Sort by date:</p>&#160;&#160;
                <IconButton aria-label="delete" size="small" onClick={() => {
                    dispatch(addFillterByDate('desc'))
                    dispatch(filtersByDate({ statusItem: 'desc', currentPage: objTodo.page, statusDone: objTodo.filterDone }))
                }}>
                    <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={() => {
                    dispatch(addFillterByDate('asc'))
                    dispatch(filtersByDate({ statusItem: 'asc', currentPage: objTodo.page, statusDone: objTodo.filterDone }))
                }}>
                    <ArrowUpwardIcon fontSize="inherit" />
                </IconButton>
            </span>
        </div >
    )
}

export default Filters
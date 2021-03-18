import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';



function Filters(props){
    const { filters, 
            filtersForDate} = props
    return(
        <div className="containerForFiltersBtn">
            <div>
                <button className = "btnFilterExpendTodo" onClick = {() => filters('done')}>Done</button>
                <button className = "btnFilterNotExpendTodo" onClick = {() => filters('undone')}>Undone</button>
                <button className = "btnFilterAllTodo" onClick = {() => filters('all')}>All</button>
            </div>
            <span className="arrowContainer">
            <p>Sort by date:</p>&#160;&#160;
                <IconButton aria-label="delete"  size="small">
                    <ArrowDownwardIcon fontSize="inherit" onClick={() => filtersForDate(false)}/>
                </IconButton>
                <IconButton aria-label="delete"  size="small">
                    <ArrowUpwardIcon fontSize="inherit" onClick={() => filtersForDate(true)}/>
                </IconButton>
            </span>    
        </div>  
    )
}

export default Filters
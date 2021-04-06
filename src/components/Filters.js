import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';



function Filters(props){
    const { filters, 
            filtersForDate} = props
    return(
        <div className="containerForFiltersBtn">
            <div>
            <Button variant = "outlined" color = "primary" onClick = {() => filters('true')}>
                Done
            </Button>
            <Button variant = "outlined" color = "secondary" onClick = {() => filters('false')}>
                Undone
            </Button>
            <Button variant = "outlined" color = "default" onClick = {() => filters('')}>
                All
            </Button>
            </div>

            <span className="arrowContainer">
                <p>Sort by date:</p>&#160;&#160;
                <IconButton aria-label = "delete"  size="small" onClick = {() => filtersForDate('desc')}>
                    <ArrowDownwardIcon fontSize = "inherit" />
                </IconButton>
                <IconButton aria-label = "delete"  size="small" onClick = {() => filtersForDate('asc')}>
                    <ArrowUpwardIcon fontSize = "inherit" />
                </IconButton>
            </span>    
        </div>  
    )
}

export default Filters
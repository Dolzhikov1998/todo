import React from 'react'



function Filters({filters}){
    return(
        <div className="containerForFiltersBtn">
            <div>
                <button className = "btnFilterExpendTodo" onClick = {() => filters('done')}>Done</button>
                <button className = "btnFilterNotExpendTodo" onClick = {() => filters('undone')}>Undone</button>
                <button className = "btnFilterAllTodo" onClick = {() => filters('all')}>All</button>
            </div>
        </div>  
    )
}

export default Filters
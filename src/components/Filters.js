import React from 'react'



function Filters({filterDoneTodos, filterFalseTodos, filterAllTodos}){
    return(
        <div className="containerForFiltersBtn">
            <button className="btnFilterExpendTodo" onClick={()=>filterDoneTodos()}>Done</button>
            <button className="btnFilterNotExpendTodo" onClick={()=>filterFalseTodos()}>Undone</button>
            <button className="btnFilterAllTodo" onClick={()=>filterAllTodos()}>All</button>
        </div>
    )
}

export default Filters
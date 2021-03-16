import React from 'react'

function Filters({filterDoneTodos, filterFalseTodos, filterAllTodos}){
    return(
        <div className="containerForFiltersBtn">
            <button className="btnFilterExpendTodo" onClick={()=>filterDoneTodos()}>Ready</button>
            <button className="btnFilterNotExpendTodo" onClick={()=>filterFalseTodos()}>Dont ready</button>
            <button className="btnFilterAllTodo" onClick={()=>filterAllTodos()}>All</button>
        </div>
    )
}

export default Filters
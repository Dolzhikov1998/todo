import React from 'react'
import Item from './Item'


function ListTodos(props){
    const {
        stateDate,
        statusTodos, 
        todos, 
        deleteItem, 
        changeCheckedTodosItem,
        changeTitle,
        statePag
    } = props

    const sortDateUp = (a, b) => {
        if(a.createdAt < b.createdAt) return 1
        else if(a.createdAt > b.createdAt) return -1
        else if(a.createdAt === b.createdAt) return 0
    }
    const sortDateDown = (a, b) => {
        if(a.createdAt > b.createdAt) return 1
        else if(a.createdAt < b.createdAt) return -1
        else if(a.createdAt === b.createdAt) return 0
    }

    const filterTodoForDate = () =>{
            return todos.sort(stateDate ? sortDateUp : sortDateDown)
    }
    
    const filters = () =>{
            if(statusTodos !== 'all')
            {
                return filterTodoForDate().filter((_,index)=> (index >= (statePag * 5))&&(index < (statePag * 5) +5)).map(todo => {
                          if(todo.done === eval(statusTodos)){
                            return (<Item 
                            key = {todo.uuid} 
                            todo = {todo}  
                            deleteItem = {deleteItem} 
                            changeTitle = {changeTitle}  
                            changeCheckedTodos = {changeCheckedTodosItem}/>)
                          }
                        })
            }
            
        return filterTodoForDate().filter((_,index)=> (index >= (statePag * 5))&&(index < (statePag * 5) +5)).map( todo => (<Item 
                    key = {todo.uuid} 
                    todo = {todo}  
                    deleteItem = {deleteItem}
                    changeTitle = {changeTitle}   
                    changeCheckedTodos = {changeCheckedTodosItem}
                />))
    }

    return(
        <div className = "ListTodos">
            {filters()}
        </div>
    )

    }

export default ListTodos
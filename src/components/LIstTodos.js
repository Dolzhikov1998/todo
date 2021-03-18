import React from 'react'
import Item from './Item'


function ListTodos(props){
    const {
        statusTodos, 
        todos, 
        deleteItem, 
        changeCheckedTodosItem 
    } = props


    const filters = () =>{
        if(statusTodos !== 'all')
        {
            return todos.map(todo => {
                      if(todo.status === statusTodos){
                        return (<Item 
                        key = {todo.id} 
                        todo = {todo}  
                        deleteItem = {deleteItem} 
                        changeCheckedTodos = {changeCheckedTodosItem}/>)
                      }
                    })
        }

        return todos.map( todo => (<Item 
                key = {todo.id} 
                todo = {todo}  
                deleteItem = {deleteItem} 
                changeCheckedTodos = {changeCheckedTodosItem}
            />))
    }

    return(
        <div>
            {filters()}
        </div>
    )

    }

export default ListTodos
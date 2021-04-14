import React from 'react'
import Item from './Item'


function ListTodos(props) {
    const {
        todos,
        deleteItem,
        changeCheckedTodosItem,
        changeTitle
    } = props


    const filters = () => {
      
        return todos.map(todo => (<Item
            key={todo.uuid}
            todo={todo}
            deleteItem={deleteItem}
            changeTitle={changeTitle}
            changeCheckedTodos={changeCheckedTodosItem}
        />))
    }

    return (
        <div className="ListTodos">
            {filters()}
        </div>
    )

}

export default ListTodos
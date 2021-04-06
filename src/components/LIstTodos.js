import React from 'react'
import Item from './Item'


function ListTodos(props) {
    const {
        todos,
        deleteItem,
        changeCheckedTodosItem,
        changeTitle
    } = props

    // const sortDateUp = (a, b) => {
    //     if (a.date < b.date) return 1
    //     else if (a.date > b.date) return -1
    //     else if (a.date === b.date) return 0
    // }
    // const sortDateDown = (a, b) => {
    //     if (a.date > b.date) return 1
    //     else if (a.date < b.date) return -1
    //     else if (a.date === b.date) return 0
    // }

    // const filterTodoForDate = () => {
    //     return todos.sort(stateDate ? sortDateUp : sortDateDown)
    // }

    const filters = () => {
        // if (statusTodos !== 'all') {
        //     return filterTodoForDate().map(todo => {
        //         // if (todo.done === eval(statusTodos)) {
        //             return (<Item
        //                 key={todo.uuid}
        //                 todo={todo}
        //                 deleteItem={deleteItem}
        //                 changeTitle={changeTitle}
        //                 changeCheckedTodos={changeCheckedTodosItem} />)
        //         // }
        //     })
        // }

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
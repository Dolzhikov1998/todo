import React from 'react'
import Item from './Item'
import { Todo } from '../App'

export interface IListTodos {
    todos: Todo[],
    deleteItem(uuid: string): void,
    changeCheckedTodosItem(uuid: string): void,
    changeTitle(stateTitle: string, uuid: string): void
}


const ListTodos: React.FunctionComponent<IListTodos> = (props) => {
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
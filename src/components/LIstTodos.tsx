import React from 'react'
import Item from './Item'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'

export interface IListTodos {
    // todos: Todo[],
    deleteItem(uuid: string): void,
    changeCheckedTodosItem(uuid: string): void,
    changeTitle(stateTitle: string, uuid: string): void
}

const ListTodos = (props: IListTodos) => {
    const {
        deleteItem,
        changeCheckedTodosItem,
        changeTitle
    } = props

    const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)
    console.log(Objtodos.todos)

    const filters = () => {
        return Objtodos.todos.map(todo => (<Item
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
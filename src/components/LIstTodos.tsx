import React from 'react'
import Item from './Item'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'

const ListTodos = () => {

    const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)

    const filters = () => {
        return Objtodos.todos.map(todo => (<Item
            key={todo.uuid}
            todo={todo}
        />))
    }

    return (
        <div className="ListTodos">
            {filters()}
        </div>
    )
}

export default ListTodos
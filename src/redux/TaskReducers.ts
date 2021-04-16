import { createReducer } from '@reduxjs/toolkit';
import { getTask, addTasks } from './actions'


export interface Todo {
    name: string,
    done: boolean,
    createdAt?: string,
    upfatedAt?: string,
    uuidUser: string,
    uuid?: string
}

export interface Todos {
    todos: Todo[]
}

export const initialState: Todos = {
    todos: []
}

export default createReducer(initialState, builder => {
    builder
        .addCase(getTask, (state, action) => {
            
        })
        .addCase(addTasks, (state, action) => {
            state.todos = action.payload
            return state
        })
})
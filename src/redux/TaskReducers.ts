import { createReducer } from '@reduxjs/toolkit';
import { addingTasks, addOneTask, deleteOneTask, filterByDone, filterByDate, changeTitleInStore, changeChecked, AllowNeedPage } from './TaskActions'


export interface Todo {
    name: string,
    done: boolean,
    createdAt: string,
    upfatedAt: string,
    uuidUser: string,
    uuid: string
}

export interface Todos {
    todos: Todo[]
}

export const initialState: Todos = {
    todos: []
}

export default createReducer(initialState, builder => {
    builder
        .addCase(addOneTask, (state, action) => {
            state.todos.push(action.payload)
            return state
        })
        .addCase(addingTasks, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(deleteOneTask, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(filterByDone, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(filterByDate, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(changeChecked, (state, action) => {
            state.todos.filter(item => {
                if (item.uuid === action.payload) item.done = !item.done
                return item
            })
            return state
        })
        .addCase(AllowNeedPage, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(changeTitleInStore, (state, action) => {
            state.todos.map(item => {
                if (item.uuid === action.payload.idItem) { item.name = action.payload.value }
                return item
            })
            return state
        })
})
import { createReducer } from '@reduxjs/toolkit';
import { addingTasks, changeNumberPage, addFillterByDone, addFillterByDate, clearStore } from './TaskActions'
import { addNewTask, changeCheckedTodosItem, changeTitle, deleteTodo, filtersByDate, filtersByDone, FirstGetTasks, handlerPagination } from './TaskRequestAPI';

export interface Todo {
    name: string,
    done: boolean,
    createdAt: string,
    upfatedAt: string,
    uuidUser: string,
    uuid: string
}


export interface Todos {
    todos: Todo[],
    page: number,
    filterDone: string,
    counterPages: number,
    filterDate: string
}

export const initialState: Todos = {
    todos: [],
    page: 1,
    filterDone: '',
    counterPages: 1,
    filterDate: 'asc'
}

export default createReducer(initialState, builder => {
    builder
        .addCase(addingTasks, (state, action) => {
            state.todos = action.payload
            return state
        })
        .addCase(addNewTask.fulfilled, (state, action) => {
            console.log(action.payload)
            state.counterPages = Math.ceil(action.payload.countCards.count / 5)
            if (state.todos.length < 5) state.todos.push(action.payload.card);
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.counterPages = Math.ceil(action.payload.data.count / 5)
                state.todos = action.payload.data.rows
            }
        })
        .addCase(filtersByDone.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.counterPages = Math.ceil(action.payload.data.count / 5)
                state.page = 0
                state.todos = action.payload.data.rows
            }
        })
        .addCase(filtersByDate.fulfilled, (state, action) => {
            if (action.payload) {
                state.counterPages = Math.ceil(action.payload.data.count / 5)
                state.todos = action.payload.data.rows
            }
        })
        .addCase(changeTitle.fulfilled, (state, action) => {
            if (action.payload) {
                state.todos.map(item => {
                    if (item.uuid === action.payload?.id) { item.name = action.payload.title }
                    return item
                })
                return state
            }
        })
        .addCase(changeCheckedTodosItem.fulfilled, (state, action) => {
            if (action.payload) {
                state.todos.map(item => {
                    if (item.uuid === action.payload?.id) { item.done = action.payload.checkValue }
                    return item
                })
                return state
            }
        })
        .addCase(handlerPagination.fulfilled, (state, action) => {
            if (action.payload) {
                state.todos = action.payload.data.rows
                return state
            }
        })
        .addCase(changeNumberPage, (state, action) => {
            if (action.payload === 1)
                state.page = 0
            state.page = action.payload
            return state
        })
        .addCase(FirstGetTasks.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.todos = action.payload.rows
                state.counterPages = Math.ceil(action.payload.count / 5)
                return state
            }

        })
        .addCase(addFillterByDone, (state, action) => {
            state.filterDone = action.payload
            return state
        })
        .addCase(addFillterByDate, (state, action) => {
            if (action.payload) state.filterDate = action.payload
            return state
        })
        .addCase(clearStore, (state, action) => {
            state.todos = []
            return state
        })

})
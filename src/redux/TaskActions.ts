import { createAction } from '@reduxjs/toolkit';
import { Todo } from './TaskReducers';

export interface ChangeTitleTask {
    idItem: string
    value: string
}

export const addingTasks = createAction<Todo[]>('addingTasks')
export const deleteOneTask = createAction<Todo[]>('deleteONeTask')
export const addOneTask = createAction<Todo>('addOneTask')
export const filterByDone = createAction<Todo[]>('filterByDone')
export const filterByDate = createAction<Todo[]>('filterByDate')
export const changeChecked = createAction<string>('changeChecked')
export const AllowNeedPage = createAction<Todo[]>('AllowNeedPage')
export const changeTitleInStore = createAction<ChangeTitleTask>('changeTitleInStore')




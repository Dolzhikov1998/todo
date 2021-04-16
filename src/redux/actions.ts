import { createAction } from '@reduxjs/toolkit';
import { Todo } from './TaskReducers';


export const getTask = createAction('getTask')
export const addTasks = createAction<Todo[]>('addTasks')
export const deleteTask = createAction('deleteTask')




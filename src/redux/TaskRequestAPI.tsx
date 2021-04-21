import { createAsyncThunk } from '@reduxjs/toolkit';
import { INewItem } from '../components/Header'
import { AxiosResponse } from 'axios';
import { addTask, deleteTask, getTask, checkTask } from '../services/taskServices'
import { changeCheckTask, changeTitleTask, DeleteItem } from '../components/Item';
import { FiltersTasks } from '../components/Filters';
import { firstRender, Pagin } from '../App';

const querystring = require('querystring');

export const addNewTask = createAsyncThunk(
    'task/addTask',
    async (newItem: INewItem) => {
        try {
            const response: AxiosResponse<any> | undefined = await addTask({ name: newItem.name })
            if (response?.status === 200) return response?.data
        } catch (e) {
            console.log(e)
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'task/deleteTask',
    async (deleteItem: DeleteItem) => {
        try {
            const response = await deleteTask(deleteItem.idDeleteItem)
            if (response?.status === 204) {
                const responseBeforeDelete = await getTask(querystring.stringify({
                    page: deleteItem.numberPages,
                    done: deleteItem.statusDone,
                    order: 'asc'
                }))
                console.log(responseBeforeDelete)
                if (responseBeforeDelete) return responseBeforeDelete
            }
        } catch (e) {
            console.log(e)
        }
    }
);

export const filtersByDone = createAsyncThunk(
    'task/filterByDone',
    async (filterTaskByDone: FiltersTasks) => {
        console.log(filterTaskByDone.currentPage);
        try {
            const response = await getTask(querystring.stringify({
                page: 0,
                done: filterTaskByDone.statusItem,
                order: filterTaskByDone.statusDate
            }))
            if (response) return response
        } catch (e) {
            console.log(e)
        }
    }
);

export const filtersByDate = createAsyncThunk(
    'task/filterByDate',
    async (filterTaskByDate: FiltersTasks) => {
        try {
            const response = await getTask(querystring.stringify({
                page: filterTaskByDate.currentPage === 0 ? 0 : filterTaskByDate.currentPage - 1,
                done: filterTaskByDate.statusDone,
                order: filterTaskByDate.statusItem
            }))
            if (response) return response
        } catch (e) {
            console.log(e)
        }
    }
);

export const changeTitle = createAsyncThunk(
    'task/changeTitle',
    async (newItem: changeTitleTask) => {
        try {
            const response = await checkTask(newItem.idItem, { name: newItem.stateTitle, done: newItem.valueCheckBox })
            if (response?.status === 200) return { id: newItem.idItem, title: newItem.stateTitle }
        } catch (e) {
            console.log(e)
        }
    }
);

export const changeCheckedTodosItem = createAsyncThunk(
    'task/changeChecked',
    async (newItem: changeCheckTask) => {
        try {
            const response = await checkTask(newItem.idItem, { name: newItem?.name, done: !newItem?.done })
            if (response?.status === 200) return { id: newItem.idItem, checkValue: !newItem?.done }
        } catch (e) {
            console.log(e)
        }
    }
);

export const handlerPagination = createAsyncThunk(
    'task/Pagin',
    async (page: Pagin,) => {
        try {
            const response = await getTask(querystring.stringify({
                page: page.statePagNow - 1,
                order: page.filterDate,
                done: page.filterDone
            }))
            if (response) return response
        } catch (e) {
            console.log(e)
        }
    }
);


export const FirstGetTasks = createAsyncThunk(
    'tasks/tasks',
    async (page: firstRender) => {
        try {
            const response: AxiosResponse<any> | undefined = await getTask(querystring.stringify({
                page: page.statePag,
                order: 'asc'
            }))
            if (response?.status === 200) return response.data
        } catch (e) {
            console.log(e)
        }
    }
);



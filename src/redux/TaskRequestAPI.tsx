import { createAsyncThunk } from '@reduxjs/toolkit';
import { INewItem } from '../components/Header'
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addingTasks, addOneTask, deleteOneTask, filterByDone, filterByDate, changeTitleInStore, changeChecked, AllowNeedPage } from './TaskActions'
import { addTask, deleteTask, getTask, checkTask } from '../services/taskServices'
import { useSelector } from 'react-redux'
import { AppState } from './store'





// export const addNewTask = createAsyncThunk(
//     'task/addTask',
//     async (newItem: INewItem) => {
//         const dispath = useDispatch()
//         const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)

//         const response: AxiosResponse<any> | undefined = await addTask({ name: newItem.name })
//         console.log(response);
//         if (response?.status === 200 && Objtodos.todos.length < 5) dispath(addOneTask(response.data.card))

//     }
// );

export const addNewTask = createAsyncThunk(
    'task/addTask',
    async (newItem: INewItem) => {
        // const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)
        // console.log(Objtodos);
        try {
            // const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)
            // console.log(Objtodos)
            const response: AxiosResponse<any> | undefined = await addTask({ name: newItem.name })
            // if (response?.status === 200 && Objtodos.todos.length < 5)
                return response?.data
        } catch (e) {
            console.log(e)
        }


    }
);





import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Icon from '@material-ui/core/Icon'
import { Todo } from '../App'
import { useDispatch } from 'react-redux'
import { changeCheckedTodosItem, changeTitle, deleteTodo } from '../redux/TaskRequestAPI'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'

const useStyles = makeStyles(() => ({
    root: {
        width: "750px"
    },
}));

export interface DeleteItem {
    idDeleteItem: string,
    numberPages: number,
    statusDone: string
}

export interface changeTitleTask {
    stateTitle: string
    idItem: string,
    valueCheckBox: boolean | undefined
}

export interface changeCheckTask {
    name: string,
    done: boolean,
    idItem: string
}


const Item = (props: any) => {

    const { todo } = props

    const [stateCheck, setStateCheck] = useState<boolean>(todo.done)
    const [stateTitle, setStateTitle] = useState<string>(todo.name)

    const styleInput = useStyles()

    const dispatch = useDispatch()

    const objTodo = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers);

    // useEffect(() =>{
    //     changeTitle(stateTitle, todo.uuid)
    // },[stateTitle])

    return (
        <div className="elements" >
            <div className="check" >
                <Checkbox
                    name="checkedB"
                    color="secondary"
                    checked={stateCheck}
                    onChange={(e) => {
                        const check: Todo | undefined = objTodo.todos.find(item => item.uuid === todo.uuid)
                        if (check) dispatch(changeCheckedTodosItem({ name: check?.name, done: check?.done, idItem: todo.uuid }))
                        setStateCheck(!stateCheck)
                    }} />
            </div>
            <div className="elemetns-content">
                <div className="a">
                    &#160;&#160;&#160;
                    <TextField
                        id={todo.uuid}
                        variant="standard"
                        className={styleInput.root}
                        value={stateTitle}
                        onChange={event => {
                            setStateTitle(event.target.value)
                            const check = objTodo.todos.find((item: Todo) => item.uuid === todo.uuid)
                            dispatch(changeTitle({ stateTitle: stateTitle, idItem: todo.uuid, valueCheckBox: check?.done }))
                        }}>
                    </TextField>&#160;&#160;&#160;
                    <Box>{todo.createdAt}</Box>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { dispatch(deleteTodo({ idDeleteItem: todo.uuid, numberPages: objTodo.page - 1, statusDone: objTodo.filterDone })) }}
                >
                    <Icon><DeleteForeverIcon /></Icon>
                </Button>
            </div>
        </div>
    )
}

export default Item
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Icon from '@material-ui/core/Icon';
import { Todo } from '../App'

const useStyles = makeStyles(() => ({
    root: {
        width: "750px"
    },
}));

export interface IItem {
    todo: Todo,
    deleteItem(uuid: string): void,
    changeCheckedTodos(uuid: string): void,
    changeTitle(stateTitle: string, uuid: string): void
}

const Item: React.FunctionComponent<IItem> = (props) => {
    const { todo,
        deleteItem,
        changeCheckedTodos,
        changeTitle } = props

    const [stateCheck, setStateCheck] = useState<boolean>(todo.done)
    const [stateTitle, setStateTitle] = useState<string>(todo.name)

    const styleInput = useStyles()

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
                        changeCheckedTodos(todo.uuid)
                        setStateCheck(!stateCheck)
                    }} />
            </div>
            <div className="elemetns-content">
                <div className="a">
                    &#160;&#160;&#160;
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        className={styleInput.root}
                        value={stateTitle}
                        onChange={event => {
                            setStateTitle(event.target.value)
                            changeTitle(stateTitle, todo.uuid)
                        }}>
                    </TextField>&#160;&#160;&#160;
                    <Box>{todo.createdAt}</Box>
                </div>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { deleteItem(todo.uuid) }}
                >
                    <Icon><DeleteForeverIcon /></Icon>
                </Button>
            </div>
        </div>
    )
}

export default Item
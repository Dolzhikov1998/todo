import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(() => ({
    root: {
      width: "750px"
    },
  }));

function Item(props){
    const { todo, 
            deleteItem, 
            changeCheckedTodos,
            changeTitle} = props

    const [stateCheck, setStateCheck] = useState(todo.done)
    const [stateTitle, setStateTitle] = useState(todo.name)
    //  console.log(todo)
    const styleInput = useStyles()
    return(
        <div className = "elements" >
            <div className = "check" >
            <Checkbox
            name = "checkedB"
            color = "secondary"
            checked = {stateCheck}
            onChange = {() => {
                changeCheckedTodos(todo.uuid)
                setStateCheck(!stateCheck)
            }}/>
            </div>
            <div className = "elemetns-content">
                <div className = "a">
                    &#160;&#160;&#160;
                    <TextField 
                    id = "standard-basic" 
                    variant = "standard"
                    className = {styleInput.root} 
                    value = {todo.name}
                    onChange = {event => {setStateTitle(event.target.value)
                                         changeTitle(stateTitle, todo.uuid)}}>
                    </TextField>&#160;&#160;&#160;
                    <Box>{todo.createdAt}</Box>
                </div>
        
                <Button 
                variant = "contained" 
                color = "secondary" 
                onClick = { () => {deleteItem(todo.uuid)}}
                >
                    <Icon><DeleteForeverIcon/></Icon>
                </Button>
            </div>
        </div>
    )
}

export default Item
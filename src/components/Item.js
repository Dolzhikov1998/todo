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
      width: "780px"
    },
  }));

function Item(props){
    const { todo, 
            deleteItem, 
            changeCheckedTodos,
            changeTitle} = props

    const [stateCheck, setStateCheck] = useState(todo.checked)
    const [stateTitle, setStateTitle] = useState(todo.title)
     
    const styleInput = useStyles()
    return(
        <div className = "elements" >
            <div className = "check" >
            <Checkbox
            name = "checkedB"
            color = "secondary"
            checked = {stateCheck}
            onChange = {() => {
                changeCheckedTodos(todo.id)
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
                    value = {stateTitle}
                    onChange = {event => {setStateTitle(event.target.value)
                                         changeTitle(stateTitle, todo.id)}}>
                    </TextField>&#160;&#160;&#160;
                    <Box>{todo.date}</Box>
                </div>
        
                <Button 
                variant = "contained" 
                color = "secondary" 
                onClick = { () => {deleteItem(todo.id)}}
                >
                    <Icon><DeleteForeverIcon/></Icon>
                </Button>
            </div>
        </div>
    )
}

export default Item
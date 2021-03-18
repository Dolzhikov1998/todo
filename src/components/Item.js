import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'


function Item(props){
    const { todo, 
            deleteItem, 
            changeCheckedTodos,
            changeTitle} = props

    const [stateCheck, setStateCheck] = useState(todo.checked)
    const [stateTitle, setStateTitle] = useState(todo.title)

    const classes = ['elemetns-content']

    if(stateCheck){
        classes.push('done')
    }  

    return(
        <div className = "elements" >
            <div className = "check" >
                <input type = "checkbox" 
                className = "check_f"
                checked = {stateCheck}
                onChange = {() => {
                    changeCheckedTodos(todo.id)
                    setStateCheck(!stateCheck)
                }}/>
            </div>
            <div className = { classes.join(' ') }>
                <div className="a">
                    &#160;&#160;&#160;
                    <TextField value = {stateTitle}
                                onChange = {event =>{
                                    setStateTitle(event.target.value)
                                    changeTitle(stateTitle, todo.id)}}>
                    </TextField>&#160;&#160;&#160;
                    <Box>{todo.date}</Box>
                </div>
            
                            {/* <p  className = "text_cont">{todo.title}&#160;&#160;&#160;<small>{todo.date}</small></p> */}
                <div className = "delete" onClick={ () => {deleteItem(todo.id)}}>&times;</div>
            </div>
        </div>
    )
}

export default Item
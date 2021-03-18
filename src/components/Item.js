import React, {useState} from 'react'

function Item(props){
    const {todo, 
        deleteItem, 
        changeCheckedTodos} = props

    const [stateCheck, setStateCheck]= useState(todo.checked)
    const classes = ['elemetns-content']
    const [dateCreateTodo] = useState(new Date().toLocaleString())

    if(stateCheck){
        classes.push('done')
        // console.log(classes)
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
                    // console.log(todo)
                    // console.log(!stateCheck)
                }}
                />
            </div>
            <div className = { classes.join(' ') }>
                <div>
                    <p className = "text_cont"><strong>{todo.title}</strong>&#160;&#160;<small>{dateCreateTodo}</small></p>
                </div>
                <div className = "delete" onClick={ () => {deleteItem(todo.id)}}>&times;</div>
            </div>
        </div>
    )
}

export default Item
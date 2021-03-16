import React, {useState} from 'react'

function Item({todo, index, deleteItem, changeCheckedTodos}){

    const [stateCheck, setStateCheck]= useState(todo.checked)
    const classes = ['elemetns-content']

    if(stateCheck){
        classes.push('done')
    }

    return(
        <div className="elements" >
            <div className="check">
                <input type="checkbox" 
                className="check_f"
                checked={stateCheck}
                onChange={()=>{
                    setStateCheck(!stateCheck)
                    changeCheckedTodos(index,stateCheck)
                }}
                />
            </div>
            <div className={classes.join(' ')}>
                <div>
                    <p className="text_cont"><strong>{todo.title}</strong>&#160;&#160;<small>{new Date().toLocaleString()}</small></p>
                </div>
                <div className="delete" onClick={()=>deleteItem(index)}>&times;</div>
            </div>
        </div>
    )
}

export default Item
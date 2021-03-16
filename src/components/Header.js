import React, {useState} from 'react'

function Header({addItem}){

    const [stateInp,setStateInp] = useState('')


return(
    <div className="require">
        <input type="text" 
        placeholder="Добавьте задачу ..." 
        className="inp_require"
        onChange={event=>setStateInp(event.target.value)}
        value = {stateInp}
        onKeyDown = {event=>{
            if(event.key == 'Enter'){
                addItem({title:stateInp,checked:false})
                setStateInp('') 
            }
        }}
        >
        </input>
        <div className="add" onClick={()=>{
                addItem({title:stateInp,checked:false})
                setStateInp('')  
        }}>
            <img src="./add.png" alt="#"/>
        </div>
    </div>
)
}

export default Header
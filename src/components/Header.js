import React, {useState} from 'react'

function Header({addItem}){
    const [stateInp, setStateInp] = useState('')
    const [counterForID, setcounterForID ] = useState(0)  
    
return(
    <div className = "require">
        <input type = "text" 
        placeholder = "Добавьте задачу ..." 
        className = "inp_require"
        onChange = {event => setStateInp(event.target.value)}
        value = {stateInp}
        onKeyDown = {event=>{
            if(event.key === 'Enter'){
                addItem({id:counterForID, title:stateInp, checked:false, status: 'undone'})
                setcounterForID(counterForID + 1)
                setStateInp('') 
            }
        }}
        >
        </input>
        <div className = "add" onClick = {() => {
                addItem({id:counterForID, title:stateInp, checked:false, status:'undone'})
                setcounterForID(counterForID + 1)
                setStateInp('')  
        }}>
            <img src = "./add.png" alt = "#"/>
        </div>
    </div>
)
}

export default Header
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';

function Header({addItem}){
    const [stateInp, setStateInp] = useState('')
    const [counterForID, setcounterForID ] = useState(0)  

return(
    <div className = "require">

        <TextField 
        id="outlined-basic" 
        label="Введите задачу" 
        variant="outlined"
        value = {stateInp}
        onChange = {event => setStateInp(event.target.value)}
        onKeyDown = {event=>{
            if(event.key === 'Enter'){
                if(stateInp === '') alert('Ничего нет!')
                else {
                    addItem({name:stateInp, done:false})
                    setcounterForID(counterForID + 1)
                    setStateInp('') 
                }
                
            }
        }}
         />
    </div>
)
}

export default Header
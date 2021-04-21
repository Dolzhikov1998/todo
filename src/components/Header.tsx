import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { addNewTask } from '../redux/TaskRequestAPI';
import { useDispatch } from 'react-redux';

export interface INewItem {
    name: string,
    done: boolean
}

// export interface IHeader {
//     addItem(newItem: INewItem): void
// }

const Header = () => {
    const [stateInp, setStateInp] = useState<string>('')
    const [counterForID, setcounterForID] = useState<number>(0)
    const dispatch = useDispatch()

    return (
        <div className="require">

            <TextField
                id="outlined-basic"
                label="Введите задачу"
                variant="outlined"
                value={stateInp}
                onChange={event => setStateInp(event.target.value)}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        if (stateInp === '') alert('Ничего нет!')
                        else {
                            event.preventDefault()
                            console.log('1111')
                            dispatch(addNewTask({name: stateInp, done: false}))
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
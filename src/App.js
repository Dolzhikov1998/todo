import React, {useState, useEffect} from 'react'
import {addTask, deleteTask, getTask, checkTask} from './services/userServices'


import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'
import AlertErr from './components/AlertErr'



function App() {
const [todos, setTodos] = useState([])
const [statusTodo, setStatusTodo] = useState('all')
const [stateDate, setStateDate] = useState(false)
const [statePag, setStatePag] = useState(0)
const [err, setErr] = useState('')

console.log(todos)
useEffect(() => { async  function func (){
    const response = await getTask()
    console.log(response)
    if(response.status === 200){
      setTodos(response.data)
    }
  } 
  func()
},[])

async function addNewItem(newItem){
  const response = await addTask({name: newItem.name, done: newItem.done})
   if(response.status === 200){
    setTodos([...todos, {...response.data}])
   }
   setErr(response.message)
}

async function deleteItem(idDeleteItem){
  const response = await deleteTask(idDeleteItem)
  if(response.status === 200){
    setTodos(todos.filter(item => item.uuid !== idDeleteItem))
    
    if(statePag === (todos.length-1)/5){
      setStatePag(statePag-1)
    }
  }
  setErr(response.message)
}

function filters(statusItem){
  setStatusTodo(
    statusItem
  )
}

function filtersForDate(valueDate){
  setStateDate(valueDate)
}

async function changeTitle(value, idItem){
   const response = await checkTask(idItem, {name: value})

  if(response.status === 200){
    todos.map(item => {
      if(item.uuid === idItem){
        item.name = value
      }
      return item
    })
  }
  setErr(response.message)
}

async function changeCheckedTodosItem(idItem){
  const check = todos.find( item => item.uuid === idItem)
  const response = await checkTask(idItem, {done: !check.done})

  if(response.status === 200){
    setTodos(
      todos.filter(item => {
        if(item.uuid === idItem){
          item.done = response.data.done
        }
        return item
      }
      )) 
}
setErr(response.message)
}

const handlerPagin = (e, statePag) => {
  if(statePag === 1)
    setStatePag(0)
  else
    setStatePag(statePag - 1)
}
// useEffect(() =>{
//   return <AlertErr err = {err}/>
// },[err])

  return (
    
      <div className = "container">
        <Header addItem = {addNewItem}/>
        <Filters 
         filters = {filters} 
         filtersForDate = {filtersForDate}/>
        <form className = 'content'>
          {
            <ListTodos 
             todos = {todos} 
             deleteItem = {deleteItem} 
             changeCheckedTodosItem = {changeCheckedTodosItem} 
             statusTodos = {statusTodo} 
             stateDate = {stateDate}
             changeTitle = {changeTitle}
             statePag = {statePag}/>
          }
        </form>
        <MyPaginations 
        todos = {todos}
        handlerPagin = {handlerPagin}/>
        <AlertErr err = {err}/>
      </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react'
import {addTask, deleteTask, getTask} from './services/userServices'


import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'



function App() {
const [todos, setTodos] = useState([])
const [arr, setArr] = useState(true)
const [statusTodo, setStatusTodo] = useState('all')
const [stateDate, setStateDate] = useState(false)
const [statePag, setStatePag] = useState(0)


useEffect( async () => {
  const response = await getTask(6)
  // if(response.status === 200){
    setTodos(response.data)
  // }
},[arr])


async function addNewItem(newItem){
  const response = await addTask(6, {name: newItem.name, done: newItem.done})
  // if(response.status === 200){
    setArr(!arr)
  // }
}

async function deleteItem(idDeleteItem){
  const response = await deleteTask(6, idDeleteItem)
  // if( response.status === 204){
    setArr(!arr)
  // }
}

function filters(statusItem){
  setStatusTodo(
    statusItem
  )
}

function filtersForDate(valueDate){
  setStateDate(valueDate)
}

function changeTitle(value, id){
  todos.map(item => {
    if(item.id === id){
      item.title = value
    }
  })
}

function changeCheckedTodosItem(idItem){
  setTodos(
    todos.filter(item => {
      if(item.id === idItem){
        item.checked = !item.checked
        if(item.status === 'done')
          item.status = 'undone'
          else item.status = 'done'
      }
      return item
    })
  )
}

const handlerPagin = (e, statePag) => {
  if(statePag === 1)
    setStatePag(0)
  else
    setStatePag(statePag - 1)
}

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
      </div>
  );
}

export default App;

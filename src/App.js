import React, {useState, useEffect} from 'react'
import {addTask, deleteTask, getTask, checkTask} from './services/userServices'


import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'



function App() {
const [todos, setTodos] = useState([])
const [statusTodo, setStatusTodo] = useState('all')
const [stateDate, setStateDate] = useState(false)
const [statePag, setStatePag] = useState(0)


useEffect( async () => {
  const response = await getTask(6)
  if(response.status === 200){
    setTodos(response.data)
  }
},[])


async function addNewItem(newItem){
  const response = await addTask(6, {name: newItem.name, done: newItem.done})
   if(response.status === 200){
    setTodos([...todos, {
    uuid: response.data.uuid, 
    name: response.data.name, 
    done: response.data.done, 
    createdAt: response.data.createdAt} ])
   }
}

async function deleteItem(idDeleteItem){
  const response = await deleteTask(6, idDeleteItem)
  // if(response.status === 204){
    setTodos(todos.filter(item => item.uuid != idDeleteItem))
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

async function changeTitle(value, idItem){
  todos.map(item => {
    if(item.uuid === idItem){
      item.name = value
    }
  })
}

async function changeCheckedTodosItem(idItem){
  const check = todos.find( item => item.uuid === idItem)
  console.log(check.done)
  const response = await checkTask(6, idItem, {done: !check.done})
  if(response.status === 200){
    setTodos(
      todos.filter(item => {
        if(item.uuid === idItem){
          item.done = response.data.done
        }
        return item
      })) 
}
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

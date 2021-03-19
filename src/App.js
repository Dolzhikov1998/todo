import React, {useState} from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'


function App() {
const [todos, setTodos] = useState([])
const [statusTodo, setStatusTodo] = useState('all')
const [stateDate, setStateDate] = useState(false)
const [statePag, setStatePag] = useState(0)


function addNewItem(newItem){
  setTodos([...todos, newItem])
}

function deleteItem(idDeleteItem){
  setTodos(
    todos.filter(item => item.id !== idDeleteItem)
  )
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

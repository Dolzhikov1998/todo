import React, {useState} from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'


function App() {
const [todos, setTodos] = useState([])
const [statusTodo, setStatusTodo] = useState('all')


function addNewItem(newItem){
  setTodos([...todos, newItem])
}

function deleteItem(idDeleteItem){
  setTodos(
    todos.filter(item => item.id !== idDeleteItem)
  )
  console.log(todos)
}

function filters(statusItem){
  setStatusTodo(
    statusItem
  )
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

  return (
    
      <div className = "container">
        <Header addItem = {addNewItem}/>
        <Filters filters = {filters}/>
        <form className = 'content'>
          {
            <ListTodos todos = {todos} deleteItem = {deleteItem} changeCheckedTodosItem = {changeCheckedTodosItem} statusTodos = {statusTodo}/>
          }
        </form>
        
      </div>
  );
}

export default App;

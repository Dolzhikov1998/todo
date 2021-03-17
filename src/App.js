import React, {useState} from 'react'
import Header from './components/Header'
import Item from './components/Item'
import Filters from './components/Filters'


function App() {

const [todos, setTodos] = useState([])
const [todosForFilter, setTodosForFilter] = useState([])


function addNewItem(newItem){
  const newTodo= [...todos, newItem]
  setTodos(newTodo)
}

function deleteItemComponent( idDeleteItem){
  setTodos(
    todos.filter(item => item.id !== idDeleteItem)
  )
  console.log(todos)
}

function filterReadyTodos(){

  // setTodos(
  //   todos.filter(item =>{
  //     (item.checked === true) && (item.visibility = false)
  //   })
  // )
  console.log(todos)
  console.log(todosForFilter)
 }

function filterDontReadyTodos(){
  console.log(todos)
    todos.filter( item => item.checked === false)
}

function filterRenderAllTodos(){
  console.log(todos)
  setTodos(
    todos.filter(item=>{
      return item.checked || true
    })
  )
}

function changeCheckedTodosItem(idItem){
  setTodos(
    todos.filter(item => {
      if(item.id === idItem){
        item.checked = !item.checked
      }
      // (item.id === idItem) &&(item.checked = !item.checked)
      return item
    })
  )
}
  return (
    
      <div className="container">
        <Header addItem = {addNewItem}/>
        <Filters filterDoneTodos = {filterReadyTodos} filterFalseTodos = {filterDontReadyTodos} filterAllTodos= {filterRenderAllTodos}/>
        <form className='content'>
          {
            todos.map(todo=>(<Item key = {todo.id} todo = {todo}  deleteItem={deleteItemComponent} changeCheckedTodos={changeCheckedTodosItem}/>))
          }
        </form>
        
      </div>
  );
}

export default App;

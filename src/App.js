import React, {useState} from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Item from './components/Item'
import Filters from './components/Filters'


function App() {

const [todos, setTodos] = useState([])

function addNewItem(newItem){
  const newTodo= [...todos, newItem]
  setTodos(newTodo)
}

function deleteItemComponent(indexDeleteItem){
  setTodos(
    todos.filter((_, index)=>index != indexDeleteItem)
  )
}

function filterReadyTodos(){
  console.log(todos)
  const result = todos.filter((item,index)=>item.checked ===true)
 }

function filterDontReadyTodos(){
  console.log(todos)
    todos.filter((item,index)=>item.checked ===false)
}

function filterRenderAllTodos(){
  console.log(todos)
  setTodos(
    todos.filter(item=>{
      return item.checked || true
    })
  )
}

function changeCheckedTodosItem(indexItem,stateCheckItem){
  setTodos(
    todos.filter((item,index)=>{
      (index == indexItem) &&(item.checked = !stateCheckItem)
      return item
    })
  )
}
  return (
    
      <div className="container">
        <Header addItem = {addNewItem}/>
        <SearchBar/>
        <Filters filterDoneTodos = {filterReadyTodos} filterFalseTodos = {filterDontReadyTodos} filterAllTodos= {filterRenderAllTodos}/>
        <form className='content'>
          {
            todos.map((todo, index)=>(<Item todo = {todo} index = {index} deleteItem={deleteItemComponent} changeCheckedTodos={changeCheckedTodosItem}/>))
          }
        </form>
        
      </div>
  );
}

export default App;

import React, {useState} from 'react'
import Header from './components/Header'
import Item from './components/Item'
import Filters from './components/Filters'


function App() {
const [todos, setTodos] = useState([])
// const [todosForFilter, setTodosForFilter] = useState([])
const [btnFilters,setBtnFilters] = useState('all')


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
  setBtnFilters('done')
 }

function filterDontReadyTodos(){
  setBtnFilters('undone')
}

function filterRenderAllTodos(){
  setBtnFilters('all')
}

function changeCheckedTodosItem(idItem){
  setTodos(
    todos.filter(item => {
      if(item.id === idItem){
        item.checked = !item.checked
      }
      return item
    })
  )
}

function render(){
  if(btnFilters === 'all'){
    return todos.map(todo=>(<Item key = {todo.id} 
                                  todo = {todo}  
                                  deleteItem={deleteItemComponent} 
                                  changeCheckedTodos={changeCheckedTodosItem}/>))
  } 
  else if (btnFilters === 'done'){

    // return <p>done</p>
    
    return todos.map(todo=>{
      if(todo.checked === true){
        {console.log("kkk")}
        (<Item key = {todo.id} 
              todo = {todo}  
              deleteItem={deleteItemComponent} 
              changeCheckedTodos={changeCheckedTodosItem}/>)
      }
    })
  } else if (btnFilters === 'undone'){

     return <p>undone</p>

    // return todos.filter(item => item.checked === false).map(todo=>{
    //     (<Item key = {todo.id} 
    //       todo = {todo}  
    //       deleteItem={deleteItemComponent} 
    //       changeCheckedTodos={changeCheckedTodosItem}/>)
    // })
  }
}

  return (
    
      <div className="container">
        <Header addItem = {addNewItem}/>
        <Filters filterDoneTodos = {filterReadyTodos} filterFalseTodos = {filterDontReadyTodos} filterAllTodos= {filterRenderAllTodos}/>
        <form className='content'>
          {
            render()
            // todos.map(todo=>(<Item key = {todo.id} todo = {todo}  deleteItem={deleteItemComponent} changeCheckedTodos={changeCheckedTodosItem}/>))
          }
        </form>
        
      </div>
  );
}

export default App;

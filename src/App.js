import React, { useState, useEffect } from 'react'
import { addTask, deleteTask, getTask, checkTask } from './services/userServices'


import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'
import AlertErr from './components/AlertErr'
import Register from './reg-auth/Register'
import Auth from './reg-auth/Auth'

const querystring = require('querystring');



function App() {
  const [todos, setTodos] = useState([])
  const [statusTodo, setStatusTodo] = useState('all')
  const [stateDate, setStateDate] = useState(false)
  const [statePag, setStatePag] = useState(0)
  const [err, setErr] = useState('')
  const [countTodos, setCountTodos] = useState(0)
  const [filterDone, setFilterDone] = useState('')
  const [filterDate, setFilterDate] = useState('asc')

  useEffect(() => {
    async function func() {
      const response = await getTask(querystring.stringify({
        page: statePag,
        order: 'asc'
      }))
      if (response.status === 200) {
        setTodos(response.data.rows)
        setCountTodos(Math.ceil(response.data.count / 5))
      }
    }
    func()
  }, [])

  async function addNewItem(newItem) {
    const response = await addTask({ name: newItem.name })
    if (response.status === 200) {
      if (todos.length < 5)
        setTodos([...todos, { ...response.data }])
    }
    setCountTodos(Math.ceil(response.data.countCards.count / 5))
    setErr(response.message)
  }

  async function deleteItem(idDeleteItem) {
    const response = await deleteTask(idDeleteItem)
    if (response.status === 204) {
      const responseGet = await getTask(querystring.stringify({
        page: statePag,
        done: filterDone,
        order: filterDate
      }))

      setTodos(responseGet.data.rows)
      setCountTodos(Math.ceil(responseGet.data.count / 5))
    }
    setErr(response.message)
  }

  async function filters(statusItem) {
    setFilterDone(statusItem)
    const response = await getTask(querystring.stringify({
      page: statePag,
      done: statusItem,
      order: filterDate
    }))
    setTodos(response.data.rows)
    setStatusTodo(
      statusItem
    )
    setCountTodos(Math.ceil(response.data.count / 5))
  }

  async function filtersForDate(valueDate) {

    setFilterDate(valueDate)
    const response = await getTask(querystring.stringify({
      page: statePag,
      order: valueDate,
      done: filterDone
    }))
    setTodos(response.data.rows)
    setStateDate(valueDate)
    setCountTodos(Math.ceil(response.data.count / 5))
  }

  async function changeTitle(value, idItem) {
    const check = todos.find(item => item.uuid === idItem)
    const response = await checkTask(idItem, { name: value, done: check.done })

    if (response.status === 200) {
      todos.map(item => {
        if (item.uuid === idItem) {
          item.name = value
        }
        return item
      })
    }
    setErr(response.message)
  }

  async function changeCheckedTodosItem(idItem) {
    const check = todos.find(item => item.uuid === idItem)
    const response = await checkTask(idItem, { name: check.name, done: !check.done })

    if (response.status === 200) {
      setTodos(
        todos.filter(item => {
          if (item.uuid === idItem) {
            item.done = !item.done
          }
          return item
        }
        ))
    }
    setErr(response.message)
  }

  const handlerPagin = async (e, statePagNow) => {
    if (statePag === 1) setStatePag(0)
    setStatePag(statePagNow - 1)

    const response = await getTask(querystring.stringify({
      page: statePagNow - 1,
      order: filterDate,
      done: filterDone
    }))
    setTodos(response.data.rows)
  }

  return (

    <div className="container">

      <Auth/>

      {/* <Header addItem={addNewItem} />
      <Filters
        filters={filters}
        filtersForDate={filtersForDate} />
      <form className='content'>
        {
          <ListTodos
            todos={todos}
            deleteItem={deleteItem}
            changeCheckedTodosItem={changeCheckedTodosItem}
            statusTodos={statusTodo}
            stateDate={stateDate}
            changeTitle={changeTitle}
            statePag={statePag} />
        }
      </form>
      <MyPaginations
        todos={todos}
        countTodos={countTodos}
        handlerPagin={handlerPagin} />
      <AlertErr err={err} /> */}
    </div>
  );
}

export default App;

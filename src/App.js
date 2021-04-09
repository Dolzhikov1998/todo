import React, { useState, useEffect } from 'react'
import { addTask, deleteTask, getTask, checkTask } from './services/taskServices'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles'

import { Redirect } from 'react-router'

import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'
import AlertErr from './components/AlertErr'
import Register from './reg-auth/Register'
import Auth from './reg-auth/Auth'

const querystring = require('querystring');



function App() {

  const style = useStyles()

  const [todos, setTodos] = useState([])
  const [statusTodo, setStatusTodo] = useState('all')
  const [stateDate, setStateDate] = useState(false)
  const [statePag, setStatePag] = useState(0)
  const [err, setErr] = useState('')
  const [countTodos, setCountTodos] = useState(0)
  const [filterDone, setFilterDone] = useState('')
  const [filterDate, setFilterDate] = useState('asc')

  // const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function func() {
      try {
        const response = await getTask(querystring.stringify({
          page: statePag,
          order: 'asc'
        }))
        if (response.status === 200) {
          setTodos(response.data.rows)
          setCountTodos(Math.ceil(response.data.count / 5))
        }
      } catch (e) {
        console.log(e)
        setErr(e.message)
      }
    }
    func()
  }, [])

  async function addNewItem(newItem) {
    try {
      const response = await addTask({ name: newItem.name })
      if (response.status === 200) {
        if (todos.length < 5)
          setTodos([...todos, { ...response.data.card }])
      }
      setCountTodos(Math.ceil(response.data.countCards.count / 5))
    } catch (e) {
      console.log(e)
      setErr(e.message)
    }

  }

  async function deleteItem(idDeleteItem) {
    try {
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

    } catch (e) {
      console.log(e)
      setErr(e.message)
    }

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
    try {
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
    } catch (e) {
      setErr(e.message)
    }

  }

  async function changeCheckedTodosItem(idItem) {
    try {
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
    } catch (e) {
      setErr(e.message)
    }

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


  // export const newError = err => {
  //   setErr(err)
  // }

  return (
    <Router >
      <Switch>
        <Route path='/todo/reg'>
          {
            localStorage.getItem('token') ? <Redirect to='/todo/app' /> : <Register />
          }

        </Route>

        <Route path='/todo/auth'>
          {localStorage.getItem('token') ? <Redirect to='/todo/app' /> : <Auth />}

        </Route>

        <Route path='/todo/app'>

          {
            localStorage.getItem('token') ? <div className="container">
              <Container fixed className={style.containerForBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => localStorage.removeItem('token')}
                  className={style.buttonLogOut}>
                  Log Out
                </Button>
              </Container>

              <Header addItem={addNewItem} />
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
              <AlertErr err={err} />
            </div> : <Auth />
          }

        </Route>
      </Switch>
    </Router>
  );
}


const useStyles = makeStyles(() => ({
  buttonLogOut: {
    width: '90px',
    height: '30px',
    fontSize: '10px',
    marginTop: '20px'
  },
  containerForBtn: {
    display: 'flex',
    width: '100%',
    height: '50px',
    justifyContent: 'flex-end',
    // flexDirection:'row'
  }
}));

export default App;

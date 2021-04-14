import React, { useState, useEffect } from 'react'

import { addTask, deleteTask, getTask, checkTask } from './services/taskServices'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Redirect } from 'react-router'

import jwt_decode from "jwt-decode"

import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'
import AlertErr from './components/AlertErr'
import Register from './reg-auth/Register'
import Auth from './reg-auth/Auth'

import { AxiosResponse } from 'axios';

const querystring = require('querystring');



function App() {

  const style = useStyles()

  interface Todo {
    name?: string,
    done?: boolean,
    createdAt?: string, //???
    upfatedAt?: string  //???
    uuidUser?: string  // ???
    uuid?: string //???
  }

  const [todos, setTodos] = useState<[Todo]>([])
  const [statusTodo, setStatusTodo] = useState<string>('all')
  const [stateDate, setStateDate] = useState<string>('false')
  const [statePag, setStatePag] = useState<number>(0)
  const [err, setErr] = useState<string>('')
  const [countTodos, setCountTodos] = useState<number>(0)
  const [filterDone, setFilterDone] = useState<string>('')
  const [filterDate, setFilterDate] = useState<string>('asc')

  // const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function func() {
      try {
        const response: AxiosResponse<any> | undefined = await getTask(querystring.stringify({
          page: statePag,
          order: 'asc'
        }))
        if (response?.status === 200) {
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
      const response: AxiosResponse<any> | undefined = await addTask({ name: newItem.name })
      if (response?.status === 200) {
        if (todos.length < 5)
          setTodos([...todos, { ...response.data.card }])
      }
      setCountTodos(Math.ceil(response?.data.countCards.count / 5))
    } catch (e) {
      console.log(e)
      setErr(e.message)
    }

  }

  async function deleteItem(idDeleteItem: number) {
    try {
      const response = await deleteTask(idDeleteItem)
      if (response?.status === 204) {
        const responseGet = await getTask(querystring.stringify({
          page: statePag,
          done: filterDone,
          order: filterDate
        }))

        setTodos(responseGet?.data.rows)
        setCountTodos(Math.ceil(responseGet?.data.count / 5))
      }

    } catch (e) {
      console.log(e)
      setErr(e.message)
    }

  }

  async function filters(statusItem: string) {
    setFilterDone(statusItem)
    const response = await getTask(querystring.stringify({
      page: statePag,
      done: statusItem,
      order: filterDate
    }))
    setTodos(response?.data.rows)
    setStatusTodo(
      statusItem
    )
    setCountTodos(Math.ceil(response?.data.count / 5))
  }

  async function filtersForDate(valueDate: string) {

    setFilterDate(valueDate)
    const response = await getTask(querystring.stringify({
      page: statePag,
      order: valueDate,
      done: filterDone
    }))
    setTodos(response?.data.rows)
    setStateDate(valueDate)
    setCountTodos(Math.ceil(response?.data.count / 5))
  }

  async function changeTitle(value: string, idItem: number) {
    try {
      const check = todos.find(item => item.uuid === idItem)
      const response = await checkTask(idItem, { name: value, done: check.done })

      if (response?.status === 200) {
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

  const handlerPagin = async (e: React.ChangeEvent, statePagNow: number) => {
    if (statePag === 1) setStatePag(0)
    setStatePag(statePagNow - 1)

    const response = await getTask(querystring.stringify({
      page: statePagNow - 1,
      order: filterDate,
      done: filterDone
    }))
    setTodos(response?.data.rows)
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
                <h3>Hello, {localStorage.getItem('login')}</h3>
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
    marginTop: '20px',
    marginLeft: '20px'
  },
  containerForBtn: {
    display: 'flex',
    width: '100%',
    height: '50px',
    justifyContent: 'flex-end',
    alignItems: 'space-between'

  }
}));

export default App;

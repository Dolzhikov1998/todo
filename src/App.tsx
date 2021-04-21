import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import Filters from './components/Filters'
import ListTodos from './components/LIstTodos'
import MyPaginations from './components/Paginations'
import AlertErr from './components/AlertErr'
import Register from './reg-auth/Register'
import Auth from './reg-auth/Auth'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppState } from './redux/store'
import { changeNumberPage } from './redux/TaskActions'
import { FirstGetTasks, handlerPagination } from './redux/TaskRequestAPI'


export interface Todo {
  name: string,
  done: boolean,
  createdAt: string,
  upfatedAt: string,
  uuidUser: string,
  uuid: string
}
export interface Pagin {
  filterDate: string,
  filterDone: string,
  statePagNow: number
}

export interface firstRender {
  statePag: number
}

function App() {

  let history = useHistory()
  const style = useStyles()

  const [err, setError] = useState('')

  const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)

  const dispath = useDispatch()

  useEffect(() => {
    async function func() {
      dispath(FirstGetTasks({ statePag: 0 }))
    }
    func()
  }, [])

  // async function addNewItem(newItem: INewItem) {
  //   try {
  //     // const response: AxiosResponse<any> | undefined = await addTask({ name: newItem.name })
  //     // console.log('=========================================')

  //     // const aaa = addNewTask(newItem)
  //     // console.log(aaa)

  //     // if (response?.status === 200 && Objtodos.todos.length < 5) dispath(addOneTask(response.data.card))

  //     // setCountTodos(Math.ceil(response?.data.countCards.count / 5))
  //   } catch (e) {
  //     console.log(e)
  //     setErr(e.message)
  //   }
  // }

  // async function deleteItem(idDeleteItem: string) {
  //   try {
  //     const response = await deleteTask(idDeleteItem)
  //     if (response?.status === 204) {

  //       const responseBeforeDelete = await getTask(querystring.stringify({
  //         page: statePag,
  //         done: filterDone,
  //         order: 'asc'
  //       }))
  //       if (responseBeforeDelete) {
  //         dispath(deleteOneTask(responseBeforeDelete.data.rows))
  //         setCountTodos(Math.ceil(responseBeforeDelete?.data.count / 5))
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e)
  //     setErr(e.message)
  //   }
  // }


  // async function filters(statusItem: string) {
  //   setFilterDone(statusItem)
  //   const response = await getTask(querystring.stringify({
  //     page: statePag,
  //     done: statusItem,
  //     order: 'asc'
  //   }))

  //   if (response) {
  //     dispath(filterByDone(response.data.rows))
  //     setCountTodos(Math.ceil(response?.data.count / 5))
  //   }
  // }

  // async function filtersForDate(valueDate: string) {
  //   const response = await getTask(querystring.stringify({
  //     page: statePag,
  //     order: valueDate,
  //     done: filterDone
  //   }))

  //   if (response) {
  //     dispath(filterByDate(response.data.rows))
  //     setCountTodos(Math.ceil(response.data.count / 5))
  //   }
  // }

  // async function changeTitle(value: string, idItem: string) {
  //   try {
  //     const check: Todo | undefined = Objtodos.todos.find((item: Todo) => item.uuid === idItem)
  //     const response = await checkTask(idItem, { name: value, done: check?.done })

  //     if (response?.status === 200) dispath(changeTitleInStore({ idItem, value }))

  //   } catch (e) {
  //     setErr(e.message)
  //   }
  // }


  // async function changeCheckedTodosItem(idItem: string) {
  //   try {
  //     const check: Todo | undefined = Objtodos.todos.find(item => item.uuid === idItem)
  //     const response = await checkTask(idItem, { name: check?.name, done: !check?.done })

  //     if (response?.status === 200) dispath(changeChecked(idItem))

  //   } catch (e) {
  //     setErr(e.message)
  //   }
  // }

  const handlerPagin = async (e: React.ChangeEvent, statePagNow: number) => {
    dispath(changeNumberPage(statePagNow))

    dispath(handlerPagination({ filterDate: Objtodos.filterDate, filterDone: Objtodos.filterDone, statePagNow: statePagNow }))
  }

  return (
    <Router >
      <Switch>
        <Route path='/todo/reg' >
          <Register />
        </Route>

        <Route path='/todo/auth'>
          <Auth />
        </Route>

        <Route path='/todo/app'>
          {
            <div className="container">
              <Container fixed className={style.containerForBtn}>
                <h3>Hello, {localStorage.getItem('login')}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    localStorage.removeItem('token')
                    history.go(-1)
                  }}
                  className={style.buttonLogOut}>
                  Log Out
                </Button>
              </Container>

              <Header />
              <Filters />
              <form className='content'>
                {
                  <ListTodos />
                }
              </form>
              <MyPaginations handlerPagin={handlerPagin} />
              <AlertErr err={err} />
            </div>
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


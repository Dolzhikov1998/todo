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
import { changeNumberPage, clearStore } from './redux/TaskActions'
import { FirstGetTasks, handlerPagination } from './redux/TaskRequestAPI'
import CircularProgress from './components/Loader'


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
  const [loader, setLoader] = useState(true)

  const Objtodos = useSelector<AppState, AppState['TaskReducers']>(state => state.TaskReducers)

  const dispath = useDispatch()

  useEffect(() => {
    async function func() {
      dispath(FirstGetTasks({ statePag: 0 }))
    }
    func()
  }, [])


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
            <div className={style.container}>{
              loader ? <CircularProgress /> :
                <>
                  <Container fixed className={style.containerForBtn}>
                    <h3>Hello, {localStorage.getItem('login')}</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispath(clearStore)
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
                </>
            }

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

  },
  container: {
    width: '1200px',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default App;


import React from 'react'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

import logo from './logo.svg';

import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import ProjectToDoList from './components/ProjectToDo.js'
import LoginForm from './components/Auth.js'
import NotFound404 from './components/NotFound404.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'

const URL_BASE = 'http://127.0.0.1:8000/api/'
const get_absolute_url = (url) => `${URL_BASE}${url}`

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: [
                {name: 'Users', href: '/users'},
                {name: 'Projects', href: '/projects'},
                {name: 'ToDos', href: '/todos'}
            ],
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
        }
    }

    // Загрузка данных с backend'а
    load_data() {
        const headers = this.get_headers()

        axios.get(get_absolute_url('users/'), {headers})
            .then(response => {
                // The following line does not work with pagination
                //this.setState({'users': response.data})
                // Account for pagination
                this.setState({'users': response.data.results})
            }).catch(error => {
                console.log(error)
                // Чистим данные в случае логаута или других ошибок запроса к данным
                this.setState({'users': []})
            })
        axios.get(get_absolute_url('projects/'), {headers})
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({'projects': []})
            })
        axios.get(get_absolute_url('todos/'), {headers})
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({'todos': []})
            })
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        // Изменение состояния происходит асинхронно; второй параметр - это callback, функция, которая
        // вызывается по завершении изменения
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        // Изменение состояния происходит асинхронно; второй параметр - это callback, функция, которая
        // вызывается по завершении изменения
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    // Вызывается при монтировании компонента на страницу
    componentDidMount() {
        // Загрузка данных с backend'а происходит после загрузки токена данной функцией
        this.get_token_from_storage()
    }

    // Что нужно сделать после Logout
    afterLogout

    // Inside BrowserRouter:
    // Link's (in Menu.js) navigate between sections without reloading pages
    // Switch gives the chance to add the last Route which is routed to when no matches found above
    render() {
        // menuItems инициализируется в constructor()
        // блок навигации <nav> определяется в Menu.js
        return (
            <div>
                <BrowserRouter>
                    <header>
                        <Menu menuItems={this.state.menuItems} app={this} />
                    </header>
                    <main role="main" className="flex-shrink-0">
                        <div className="container">
                                <Switch>
                                    <Route exact path='/users' component={() => <UserList users={this.state.users} /> }/>
                                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} /> }/>
                                    <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} /> }/>
                                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} /> } />
                                    <Route path="/project/:id">
                                        <ProjectToDoList todos={this.state.todos} />
                                    </Route>
                                    <Redirect from='/' to='/users' />
                                    <Route component={NotFound404} />
                                </Switch>
                        </div>
                    </main>
                </BrowserRouter>
                <Footer />
            </div>
        )
    }

}

export default App;

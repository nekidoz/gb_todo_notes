import React from 'react'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

import logo from './logo.svg';

import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ProjectForm from './components/ProjectForm.js'
import ToDoList from './components/ToDo.js'
import ToDoForm from './components/ToDoForm.js'
import ProjectToDoList from './components/ProjectToDo.js'
import LoginForm from './components/Auth.js'
import NotFound404 from './components/NotFound404.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'

const URL_BASE = 'http://127.0.0.1:8000/'
const URL_API = 'api/'
const get_absolute_url = (url) => `${URL_BASE}${url}`
const get_absolute_api_url = (url) => `${URL_BASE}${URL_API}${url}`

const display_error = (error) => {
    console.log(error)
    alert(error + " : " + error.request.response)
}

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

        axios.get(get_absolute_api_url('users/'), {headers})
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
        axios.get(get_absolute_api_url('projects/'), {headers})
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({'projects': []})
            })
        axios.get(get_absolute_api_url('todos/'), {headers})
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => {
                console.log(error)
                this.setState({'todos': []})
            })
    }

    get_token(username, password) {
        axios.post(get_absolute_url('api-token-auth/'), {username: username, password: password})
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

    // Callback для ProjectItem для удаления проектов
    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(get_absolute_api_url(`projects/${id}/`), {headers})
            .then(response => {
                // Удалить из state без отправки запроса на сервер
                this.setState({projects: this.state.projects.filter((item) => item.id != id)})
                // Вариант с чтением данных с сервера - на случай изменений другими пользователями
//                this.load_data()
            }).catch(error => display_error(error))
    }

    // Callback для ToDoItem для удаления заметок
    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(get_absolute_api_url(`todos/${id}/`), {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id != id)})
            }).catch(error => display_error(error))
    }

    // Callback для ProjectForm для создания проектов
    // id is unused and is present for unification with updateProject
    createProject(id, name, repositoryUrl, memberUsers) {
        const headers = this.get_headers()
        const data = {name: name, repositoryUrl: repositoryUrl, memberUsers: memberUsers}
        axios.post(get_absolute_api_url('projects/'), data, {headers})
            .then(response => {
                // распаковываем имеющийся список проектов и добавляем к нему новый объект
                // без отправки запроса на сервер
                this.setState({projects: [...this.state.projects, response.data]})
//                this.load_data()        // С чтением данных с сервера - на случай изменений другими пользователями
            }).catch(error => display_error(error))
    }

    // Callback для ToDoForm для создания заметок
    createToDo(project, text, isActive) {
        const headers = this.get_headers()
        const creatorUser = this.state.users.filter((user) => user.username === this.state.username)[0].id
        const data = {project: project, text: text, creatorUser: creatorUser, isActive: isActive}
        axios.post(get_absolute_api_url('todos/'), data, {headers})
            .then(response => {
                this.setState({todos: [...this.state.todos, response.data]})
            }).catch(error => display_error(error))
    }

    // Callback для ProjectForm для создания проектов
    getProject(id) {
        const project = this.state.projects.filter((project) => project.id == id)[0]
        return project
    }

    // Callback для ProjectForm для изменения проектов
    updateProject(id, name, repositoryUrl, memberUsers) {
        const headers = this.get_headers()
        const data = {id: id, name: name, repositoryUrl: repositoryUrl, memberUsers: memberUsers}
        axios.put(get_absolute_api_url(`projects/${id}/`), data, {headers})
            .then(response => {
                // заменяем элемент в списке проектов без отправки запроса на сервер
                this.setState({
                    projects: this.state.projects.map(project => project.id !== id ? project : response.data)
                })
//                this.load_data()        // С чтением данных с сервера - на случай изменений другими пользователями
            }).catch(error => display_error(error))
    }

    searchProjects(namePart) {
        const headers = this.get_headers()
        axios.get(get_absolute_api_url('projects/'), {headers})
            .then(response => {
                if (namePart != null && namePart != "") {
                    this.setState({'projects': this.state.projects.filter((project) => project.name.includes(namePart))})
                } else {
                    this.setState({'projects': response.data.results})
                }
            }).catch(error => {
                console.log(error)
                this.setState({'projects': []})
            })
    }

    // Вызывается при монтировании компонента на страницу
    componentDidMount() {
        // Загрузка данных с backend'а происходит после загрузки токена данной функцией
        this.get_token_from_storage()
    }

    // Что нужно сделать после Logout
    //afterLogout

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
                                <Route exact path='/users'
                                       component={() => <UserList users={this.state.users} /> }/>
                                <Route exact path='/projects'
                                       component={() => <ProjectList projects={this.state.projects}
                                                               deleteProject={(id) => this.deleteProject(id)} /> }/>
                                <Route exact path='/projects/create'
                                        component={() => <ProjectForm users={this.state.users}
                                                               getProject={(id) => this.getProject(id)}
                                                               updateProject={(id, name, repositoryUrl, memberUsers) =>
                                                               this.createProject(id, name, repositoryUrl, memberUsers)}
                                                         /> } />
                                <Route exact path='/projects/:id'
                                        component={() => <ProjectForm users={this.state.users}
                                                               getProject={(id) => this.getProject(id)}
                                                               updateProject={(id, name, repositoryUrl, memberUsers) =>
                                                               this.updateProject(id, name, repositoryUrl, memberUsers)}
                                                         /> } />
                                <Route exact path='/todos'
                                       component={() => <ToDoList todos={this.state.todos}
                                                                  deleteToDo={(id) => this.deleteToDo(id)} /> }/>
                                <Route exact path='/todos/create'
                                        component={() => <ToDoForm projects={this.state.projects}
                                                                   createToDo={(project, text, isActive) =>
                                                                   this.createToDo(project, text, isActive)}
                                                         /> } />
                                <Route exact path='/login'
                                       component={() => <LoginForm get_token={(username, password) =>
                                                                   this.get_token(username, password)} /> } />
                                <Route path="/projects/:id/todos">
                                    <ProjectToDoList todos={this.state.todos} deleteToDo={(id) => this.deleteToDo(id)}/>
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

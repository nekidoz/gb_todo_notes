import React from 'react'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

import logo from './logo.svg';

import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import ProjectToDoList from './components/ProjectToDo.js'
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
                {name: 'Users', href: '/'},
                {name: 'Other', href: 'https://gitlab.com'},
                {name: "Yet another", href: 'http://github.com'}
            ],
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    // Вызывается при монтировании компонента на страницу
    componentDidMount() {
        axios.get(get_absolute_url('users/'))
            .then(response => {
                // The following line does not work with pagination
                //this.setState({'users': response.data})
                // Account for pagination
                this.setState({'users': response.data.results})
            }).catch(error => console.log(error))
        axios.get(get_absolute_url('projects/'))
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => console.log(error))
        axios.get(get_absolute_url('todos/'))
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <header>
                    <Menu menuItems={this.state.menuItems} />
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <BrowserRouter>
                            <nav><ul>
                                <li><Link to='/users'>Users</Link></li>
                                <li><Link to='/projects'>Projects</Link></li>
                                <li><Link to='/todos'>ToDos</Link></li>
                            </ul></nav>
                            <Switch>
                                <Route exact path='/users' component={() => <UserList users={this.state.users} /> }/>
                                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} /> }/>
                                <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos} /> }/>
                                <Route path="/project/:id">
                                    <ProjectToDoList todos={this.state.todos} />
                                </Route>
                                <Redirect from='/' to='/users' />
                                <Route component={NotFound404} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

}

export default App;

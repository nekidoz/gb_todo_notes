import React from 'react'
import axios from 'axios'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import logo from './logo.svg';

import './App.css';
import UserList from './components/User.js'
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
            'users': []
        }
    }

    // Вызывается при монтировании компонента на страницу
    componentDidMount() {
        axios.get(get_absolute_url('users/'))
            .then(response => {
                this.setState({'users': response.data})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <header>
                    <Menu menuItems={this.state.menuItems} />
                </header>
                <main role="main" class="flex-shrink-0">
                    <div className="container">
                        <UserList users={this.state.users} />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

}

export default App;

import React from 'react'
// Необходимо для работы history.push()
import { withRouter } from 'react-router';

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        // Вызовем callback-метод, который передали сюда в ссылке на эту форму в классе App
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()          // Отменить отправку формы - отправим самостоятельно с помощью Axios
        this.props.history.push('/')    // Перейти на главную страницу
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event) => this.handleChange(event)} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                <button type="submit">Login</button>
            </form>
        );
    }

}

export default withRouter(LoginForm)
import React from 'react'

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
        event.preventDefault()  // Отменить отправку формы - отправим самостоятельно с помощью Axios
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event) => this.handleChange(event)} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                <input type="submit" value="Login" />
            </form>
        );
    }

}

export default LoginForm
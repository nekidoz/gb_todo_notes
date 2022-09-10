import React from 'react'
// Необходимо для работы history.push()
import { withRouter } from 'react-router';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            text: '',
            isActive: true
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.text, this.state.isActive)
        event.preventDefault()
        this.props.history.push('/todos')    // Перейти на страницу проекта
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select className="form-control" name="project" onChange={(event) => this.handleChange(event)}>
                        <option key="0" value={null}>---</option>
                        {this.props.projects.map((project) =>
                            <option key={project.id} value={project.id}>{project.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                            onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">Active?</label>
                    <input type="checkbox" className="form-control" name="isActive" value={this.state.isActive}
                            onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default withRouter(ToDoForm)

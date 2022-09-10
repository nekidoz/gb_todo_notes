import React from 'react'
// Необходимо для работы history.push()
import { withRouter } from 'react-router';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            name: '',
            repositoryUrl: '',
            memberUsers: []
        }

        // Получить переданный в url id проекта (если он есть)
        // Based on this solution:
        // https://stackoverflow.com/questions/58548767/react-router-dom-useparams-inside-class-component
        const id = props.match.params.id;   // Get parameters from router (need only project id)
        if (id != null) {
            let project = props.getProject(id)
            if (project != null) {
                this.state = {
                    id: project.id,
                    name: project.name,
                    repositoryUrl: project.repositoryUrl,
                    memberUsers: project.memberUsers
                }
                // Set selections in selectBox
                var selectBox = document.getElementById("memberUsers")
                if (selectBox != null) {
                    selectBox.value = null;        // reset selection
                    for (var count=0; count < selectBox.options.length; count++) {
                        selectBox.options[count].selected = (this.state.memberUsers.indexOf(parseInt(selectBox.options[count].value)) >= 0)
                    }
                }
            }
        }

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleMemberUsersChange(event) {
        let memberUsers = []
        for (const option of event.target.selectedOptions) { memberUsers.push(option.value) }
        this.setState({'memberUsers': memberUsers})
    }

    handleSubmit(event) {
        this.props.updateProject(this.state.id, this.state.name, this.state.repositoryUrl, this.state.memberUsers)
        event.preventDefault()
        this.props.history.push('/projects')    // Перейти на страницу проектов
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name *</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                            onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="repositoryUrl">repository url</label>
                    <input type="text" className="form-control" name="repositoryUrl" value={this.state.repositoryUrl}
                            onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="memberUsers">member users</label>
                    <select className="form-control" name="memberUsers" id="memberUsers" multiple
                            onChange={(event) => this.handleMemberUsersChange(event)}>
                        {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <div>
                    <label>* = required fields</label>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default withRouter(ProjectForm)

import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repositoryUrl: '',
            memberUsers: []
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
        this.props.createProject(this.state.name, this.state.repositoryUrl, this.state.memberUsers)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
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
                    <select className="form-control" name="memberUsers" multiple
                            onChange={(event) => this.handleMemberUsersChange(event)}>
                        {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default ProjectForm

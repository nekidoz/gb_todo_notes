import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.id}/todos`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repositoryUrl}</td>
            <td>{project.memberUsers}</td>
            <td><Link to={`projects/${project.id}`}>Edit</Link></td>
            <td><button type='button' onClick={() => deleteProject(project.id)}>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <thead><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Repository URL</th>
                    <th>Members</th>
                    <th></th>
                    <th></th>
                </tr></thead>
                <tbody>
                    {projects.map((project) => <ProjectItem key={project.id.toString()}
                                                            project={project} deleteProject={deleteProject} />)}
                </tbody>
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList

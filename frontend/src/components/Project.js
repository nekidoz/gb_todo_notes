import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td><Link to={`project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repositoryUrl}</td>
            <td>{project.memberUsers}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <thead><tr>
                <th>ID</th>
                <th>Name</th>
                <th>Repository URL</th>
                <th>Members</th>
            </tr></thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id.toString()} project={project} />)}
            </tbody>
        </table>
    )
}

export default ProjectList

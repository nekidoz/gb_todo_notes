import React from 'react'
import {useParams} from 'react-router-dom'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreated}</td>
            <td>{todo.dateUpdated}</td>
            <td>{todo.isActive ? 'Yes' : 'No'}</td>
            <td>{todo.project}</td>
            <td>{todo.creatorUser}</td>
        </tr>
    )
}

const ProjectToDoList = ({todos}) => {
    let { id } = useParams();   // Get parameters from router (need only id)
                                // Filter todos by project id
    let filtered_todos = todos.filter((todo) => todo.project == id)

    return (
        <table>
            <thead><tr>
                <th>ID</th>
                <th>Text</th>
                <th>Creation date</th>
                <th>Update date</th>
                <th>Active?</th>
                <th>Project</th>
                <th>Created by user</th>
            </tr></thead>
            <tbody>
                {filtered_todos.map((todo) => <ToDoItem todo={todo} />)}
            </tbody>
        </table>
    )
}

export default ProjectToDoList

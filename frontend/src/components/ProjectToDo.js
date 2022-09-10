import React from 'react'
import {Link, useParams} from 'react-router-dom'
import ToDoItem from './ToDoItem.js'

const ProjectToDoList = ({todos, deleteToDo}) => {
    let { id } = useParams();   // Get parameters from router (need only project id)
                                // Filter todos by project id
    let filtered_todos = todos.filter((todo) => todo.project == id)

    return (
        <div>
            <table>
                <thead><tr>
                    <th>ID</th>
                    <th>Text</th>
                    <th>Creation date</th>
                    <th>Update date</th>
                    <th>Active?</th>
                    <th>Project</th>
                    <th>Created by user</th>
                    <th></th>
                </tr></thead>
                <tbody>
                    {filtered_todos.map((todo) => <ToDoItem key={todo.id.toString()}
                                                            todo={todo} deleteToDo={deleteToDo} />)}
                </tbody>
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default ProjectToDoList

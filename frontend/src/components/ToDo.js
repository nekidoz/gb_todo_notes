import React from 'react'
import ToDoItem from './ToDoItem.js'
import {Link} from 'react-router-dom'

const ToDoList = ({todos, deleteToDo}) => {
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
                    {todos.map((todo) => <ToDoItem key={todo.id.toString()} todo={todo} deleteToDo={deleteToDo} />)}
                </tbody>
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default ToDoList

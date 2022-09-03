import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreated}</td>
            <td>{todo.dateUpdated}</td>
            <td>{todo.isActive}</td>
            <td>{todo.project}</td>
            <td>{todo.creatorUser}</td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
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
                {todos.map((todo) => <ToDoItem todo={todo} />)}
            </tbody>
        </table>
    )
}

export default ToDoList

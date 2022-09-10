import React from 'react'

const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreated}</td>
            <td>{todo.dateUpdated}</td>
            <td>{todo.isActive == null ? "" : todo.isActive ? 'Yes' : 'No'}</td>
            <td>{todo.project}</td>
            <td>{todo.creatorUser}</td>
            <td><button type='button' onClick={() => deleteToDo(todo.id)}>Delete</button></td>
        </tr>
    )
}

export default ToDoItem
import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.is_superuser ? 'Yes' : 'No'}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <thead><tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Superuser?</th>
            </tr></thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList

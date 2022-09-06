import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isSuperuser == null ? "" : user.isSuperuser ? 'Yes' : 'No'}</td>
            <td>{user.isStaff == null ? "" : user.isStaff ? 'Yes' : 'No'}</td>
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
                <th>Staff?</th>
            </tr></thead>
            <tbody>
                {users.map((user) => <UserItem key={user.id.toString()} user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList

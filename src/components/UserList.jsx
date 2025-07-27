import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch users from backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/api/getAll');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setMessage('Failed to fetch users');
        }
    };

    // Delete user by ID
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/user/api/delete/${id}`);
            setMessage(response.data);
            fetchUsers(); // Refresh the list
        } catch (err) {
            console.error(err);
            setMessage('Error deleting user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center text-danger">User List</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;

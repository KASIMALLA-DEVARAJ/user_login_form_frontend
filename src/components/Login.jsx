import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { name, password };

        try {
            const response = await axios.post('http://localhost:8080/user/api/save', user);
            setMessage(response.data);
            setName('');
            setPassword('');
        } catch (err) {
            console.error(err);
            setMessage('Error saving user.');
        }
    };


    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px', backgroundColor: '#f8f9fa' }}>
                <h3 className="text-primary mb-4 text-center">User Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-secondary">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                </form>
                {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
            </div>

            
        </div>

        

    );
}




export default Login;


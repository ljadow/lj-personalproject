import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ token, setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
        try {
            console.log("in logIn fn component")
            const response = await fetch(`http://localhost:8080/api/admins/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token)
            return result
        } catch (err) {
            console.error("error logging in: ",error)
            throw new Error(`failed to login: ${error.message}`)
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={logIn}>
                <input
                    id="username"
                    autoFocus
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input
                    id="password"
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
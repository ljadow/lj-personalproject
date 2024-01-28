import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const url = useContext(baseUrl)

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/api/admins/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const result = await response.json()
            setToken(result.token)
            nav("/tasks")
            return result
        } catch (error) {
            console.error("error logging in: ", error)
            throw new Error(`failed to login: ${error.message}`)
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={logIn}>
                <label for="username">Username: </label>
                <input
                    id="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} /><br/>
                <label for="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} /><br/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}


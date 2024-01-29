import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from './context'

export default function Login({ setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errormes,setErrormes] = useState('')
    const nav = useNavigate()
    const url = useContext(baseUrl)
    
    const logIn = async (e) => {
        e.preventDefault()
        setErrormes("")
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
            nav("/admin")
            return result
        } catch (error) {
            console.log(error.message)
            setErrormes("Login failed - Please try again")
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
            {errormes && <p className='deleteError'>{errormes}</p>}
        </>
    )
}


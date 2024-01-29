import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { baseUrl } from "./context"

export default function Admin({ token, setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errormes, setErrormes] = useState('')
    const [successmes, setSuccessmes] = useState('')
    const nav = useNavigate()
    const url = useContext(baseUrl)

    async function register(e) {
        e.preventDefault()
        setErrormes('')
        try {
            const response = await fetch(`${url}/api/admins/register`, {
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
            setSuccessmes("New Admin Added")
        } catch (error) {
            setErrormes("Failed to Add - Please try again")
        }
    }

    async function logOut(e) {
        e.preventDefault()
        try {
            const response = await fetch(`${url}/api/admins/logout`, {
                method: "POST"
            })
            const result = await response.json()
            setToken(null)
        } catch (error) {
            console.error("error logging out: ", error)
        }
    }

    return (
        <>
            {token
                ?
                <>
                    <a onClick={logOut}>Logout</a>
                    <h1>Add New Admin</h1>
                    <form onSubmit={register}>
                        <label for="username">Username: </label>
                        <input
                            id="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} /><br />
                        <label for="password">Password: </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} /><br />
                        <button type="submit">Submit</button>
                    </form>
                    {errormes && <p className='deleteError'>{errormes}</p>}
                </>
                : <h4><Link to="/login">Login</Link> to Register a New Admin</h4>}
        {successmes && <h4>{successmes}</h4>}
        </>
    )
}

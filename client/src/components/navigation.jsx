import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"

export default function Navigation({ token, setToken }) {
    const nav = useNavigate()
    
    async function logOut() {
        const url = useContext(baseUrl)
        try {
            const response = await fetch(`${url}/api/admins/logout`, {
                method: "POST"
            })
            const result = await response.json()
            console.log(token)
            setToken(null)
            nav("/")
            return result
        } catch (error) {
            console.error("error logging out: ", error)
            throw new Error(`failed to logout: ${error.message}`)
        }
    }

    return (
        <nav id="navBar">
            <Link to='/tasks'>Tasks</Link>
            <Link to='/groups'>Groups</Link>
            <Link to='/users'>Users</Link>
            <a id="logout" onClick={() => { logOut() }}>Log Out</a>
        </nav>
    )
}
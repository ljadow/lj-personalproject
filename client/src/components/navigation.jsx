import { Link, useNavigate } from "react-router-dom";

export default function Navigation({ token, setToken }) {
    const nav = useNavigate();
    async function logOut() {
        try {
            const response = await fetch(`http://localhost:8080/api/admins/logout`, {
                method: "POST"
            });
            const result = await response.json();
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
            <Link id="logout" onClick={() => { logOut() }}>Log Out</Link>
        </nav>
    )
}
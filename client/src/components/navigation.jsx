import { Link } from "react-router-dom"
import { useContext } from "react"
import { baseUrl } from './context'

export default function Navigation() {
    const url = useContext(baseUrl)

    return (
        <nav id="navBar">
            <Link to='/'>Tasks</Link>
            <Link to='/groups'>Groups</Link>
            <Link to='/users'>Users</Link>
            <Link to='/admin'>Admins</Link>
        </nav>
    )
}
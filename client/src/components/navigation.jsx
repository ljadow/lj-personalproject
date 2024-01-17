import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav id="navBar">
            <h1>Task List</h1>
            <Link to='/tasks'>My Tasks</Link>
            <Link to='/groups'>Group Tasks</Link>
            <Link to='/login'>Login</Link>
        </nav>
    )
}
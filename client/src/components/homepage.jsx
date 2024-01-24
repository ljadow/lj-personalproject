import { Link } from "react-router-dom"

export default function Homepage() {
    return (
        <>
            <h1>Welcome to your task app</h1>
            <h3>Please <Link to='/login'>login</Link> to continue</h3>
        </>
    )
}
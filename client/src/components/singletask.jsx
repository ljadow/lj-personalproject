import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

function editTask(task_id) {

    fetch(`http://localhost:8080/api/tasks/${task_id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: JSON.stringify({
            available: false,
        })
    })

    return (
        <>
        </>
    )


}

export default function SingleTask() {
    const [task, setTask] = useState({})
    const [deadline, setDeadline] = useState("")
    const [location, setLocation] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [last, setLast] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`http://localhost:8080/api/tasks/${id}`)
                const data = await res.json()
                setTask(data)
                setDeadline(data.deadline.substring(0, 10))
                setLocation(data.location_id)
                setUser(data.assigned_to)
                console.log(user)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchTask()
    }, [])

    async function fetchLocation() {
        try {
            const res = await fetch(`http://localhost:8080/api/locations/${location}`)
            const data = await res.json()
            setStreet(data.street)
            setCity(data.city)
            setState(data.state)
            setZipcode(data.zipcode)
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchLocation();

    async function fetchUser() {
        try {
            const res = await fetch(`http://localhost:8080/api/users/${user}`)
            const data = await res.json()
            setName(data.first_name)
            setLast(data.last_name.substring(0, 1))
            console.log(name)
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchUser();

    return (
        <div id='SingleTask'>
            <h2 key={task.task_id}>{task.title}</h2>
            <table>
                <tr>
                    <th>Assigned to</th>
                    <th>Deadline</th>
                    <th>Task Type</th>
                </tr>
                <tr>
                    <td>{name} {last}.</td>
                    <td>{deadline}</td>
                    <td>{task.task_type}</td>
                </tr>
            </table>
            {location > 0 ? <p>Location:<br />{street}<br />{city}, {state} {zipcode}</p> : "Location: Not Provided"}
            {task.details ? <p>Details: {task.details}</p> : "No details Provided"}
            <button onClick={() => { editTask(task.task_id) }}>Edit Task</button>
            <button onClick={() => { navigate(`/tasks`) }}>Back to All</button>
        </div>
    )
}
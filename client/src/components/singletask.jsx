import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import { baseUrl } from "./context"

async function handleEdit(taskid) {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                completed: true,
            })
        })
        const APIpost = await response.json();
        console.log(APIpost)
    }
    catch (error) {
        console.log(error.message)
    }
    window.location.reload()
}

export default function SingleTask() {
    const [task, setTask] = useState({})
    const [status,setStatus] = useState(false)
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
    const url = useContext(baseUrl)

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`${url}/tasks/${id}`)
                const data = await res.json()
                setTask(data)
                setDeadline(data.deadline.substring(0, 10))
                setLocation(data.location_id)
                setUser(data.assigned_to)
                setStatus(data.completed)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchTask()
    }, [])

    async function fetchLocation() {
        try {
            const res = await fetch(`${url}/locations/${location}`)
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
            const res = await fetch(`${url}/users/${user}`)
            const data = await res.json()
            setName(data.first_name)
            const lastname = data.last_name
            setLast(lastname.substring(0, 1))
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchUser();


    async function deleteTask(taskId) {
        try {
            const response = await fetch(`${url}/tasks/${taskId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "DELETE",
            })
            const result = await response.json();
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div id='SingleTask'>
            <h2 key={task.task_id}>{task.title}</h2>
            <table>
                <tr>
                    <th>Assigned to</th>
                    <th>Deadline</th>
                    <th>Task Type</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>{name} {last}.</td>
                    <td>{deadline}</td>
                    <td>{task.task_type}</td>
                    {status?<td>Done</td>:<td>Incomplete</td>}
                </tr>
            </table>
            {location > 1 ? <p>Location:<br />{street}<br />{city}, {state} {zipcode}</p> : "Location: Not Provided"}
            {task.details ? <p>Details: {task.details}</p> : "No details Provided"}
            {!status?<button onClick={() => { handleEdit(task.task_id) }}>Mark as Complete</button>:""}
            <button onClick={() => { deleteTask(task.task_id); navigate("/tasks") }}>Delete Task</button>
            <button onClick={() => { navigate(`/tasks`) }}>Back to All</button>
        </div>
    )
}
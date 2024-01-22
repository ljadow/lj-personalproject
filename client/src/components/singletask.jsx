import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from "react"
import markComplete from './taskUpdates'
import { deleteTask, markIncomplete } from './taskUpdates'
import { baseUrl } from "./context"
import { BiPencil,BiTrashAlt, BiCircle, BiCheck  } from "react-icons/bi";

export default function SingleTask() {
    const [task, setTask] = useState({})
    const [completed, setCompleted] = useState(false)
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
                setCompleted(data.completed)
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
                    {completed ? <td>Done</td> : <td>Incomplete</td>}
                </tr>
            </table>
            {/* {location > 1 ? <p>Location:<br />{street}<br />{city}, {state} {zipcode}</p> : "Location: Not Specified"} */}
            {task.details ? <p>Details: {task.details}</p> : ""}
            {!completed ? <button onClick={() => { markComplete(task.task_id) }}><BiCheck /> Mark Complete</button> : <button onClick={() => { markIncomplete(task.task_id) }}><BiCircle/> Reopen Task</button>}
            <br/><br/>
            <button onClick={() => { deleteTask(task.task_id); navigate("/tasks") }}><BiTrashAlt/></button>
            <button onClick={() => { navigate(-1) }}>Go Back</button>
        </div>
    )
}
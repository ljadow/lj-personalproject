import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

export default function SingleTask() {
    const [task, setTask] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTask() {
            try {
                const res = await fetch(`http://localhost:8080/api/tasks/${id}`)
                const data = await res.json();
                setTask(data)
                console.log(task)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchTask();
    }, [])

    const today = new Date();

    return (
        <div id='SingleTask'>
            <h2>{task.title}</h2>
            <table>
                <tr>
                    <th>Assigned to</th>
                    <th>Priority</th>
                </tr>
                <tr>
                    <td>{task.assigned_to}</td>
                    <td>{task.priority}</td>
                </tr>
            </table>
            <p>Created on: {task.created}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Location: {task.location_id}</p>
            <p>Details: {task.details}</p>
            <button onClick={() => { navigate(`/tasks`) }}>Back to All</button>
        </div>
    )
}
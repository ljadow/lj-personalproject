import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import markComplete from './taskUpdates'
import { deleteTask, markIncomplete } from './taskUpdates'

export default function UserTasks() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await fetch(`http://localhost:8080/api/tasks/user/${id}`)
                const data = await res.json()
                setTasks(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchTasks()
    }, [])

    return (
        <div id='userTasks'>
            <h4>To Do</h4>
            {tasks.map((task) => {
                if (task.completed == false) {
                    return (
                        <li onClick={() => { navigate(`/tasks/${task.task_id}`) }}>{task.title}</li>
                    )
                }
            })}
            <h4>Completed</h4>
            {tasks.map((task) => {
                if (task.completed == true) {
                    return (
                        <li onClick={() => { navigate(`/tasks/${task.task_id}`) }}>{task.title}</li>
                    )
                }
            })}
            <button onClick={() => { navigate(-1) }}>Back to All Users</button>
        </div>
    )
}
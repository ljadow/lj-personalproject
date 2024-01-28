import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UserTasks() {
    const { id } = useParams()
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const url = useContext(baseUrl)

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await fetch(`${url}/api/tasks/user/${id}`)
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
        <>
            <div id='userTasks'>
                <h4>To Do</h4>
                {tasks.map((task) => {
                    if (task.completed == false) {
                        return (
                            <li
                                title="Click for Details"
                                className='clickable'
                                onClick={() => { navigate(`/tasks/${task.task_id}`) }}>
                                {task.title}
                            </li>
                        )
                    }
                })}
                <br/>
                <h4>Completed</h4>
                {tasks.map((task) => {
                    if (task.completed == true) {
                        return (
                            <li
                                title="Click for Details"
                                className='clickable'
                                onClick={() => { navigate(`/tasks/${task.task_id}`) }}>
                                {task.title}
                            </li>
                        )
                    }
                })}
            </div>
            <button onClick={() => { navigate(-1) }}>Back to All Users</button>
        </>
    )
}
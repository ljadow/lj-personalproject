import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [checked,setChecked] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks");
                const res = await req.json();
                setTasks(res)
                console.log("tasks")
                console.log(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchTasks();
    }, [])

    return (
        <>
            <ul>Task List
                {tasks.map((task) => {
                    return (
                        <>
                            <br/><input type="checkbox"></input>
                            <label key={task.task_id}>{task.title}</label>
                            <button onClick={() => { navigate(`/tasks/${task.task_id}`) }}>Details</button>
                        </>
                    )
                })}
            </ul>
        </>
    )
}
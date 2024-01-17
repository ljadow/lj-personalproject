import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks");
                const res = await req.json();
                setTasks(res)
                console.log(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchTasks();
    }, [])

    return( 
        <>
        <ul>Task List
            {tasks.map((task)=>{
                return(
                    <li>{task.title}</li>
                )
            })}
        </ul>
        </>
    )
}
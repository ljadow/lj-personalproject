import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    function setForm() {
        setShowForm(!showForm)
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks");
                const res = await req.json();
                setTasks(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchTasks();
    }, [])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const req = await fetch("http://localhost:8080/api/users");
                const res = await req.json();
                setUsers(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchUsers();
    }, [])

    useEffect(() => {
        async function fetchLocations() {
            try {
                const req = await fetch("http://localhost:8080/api/locations");
                const res = await req.json();
                setLocations(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchLocations();
    }, [])

    //variables for the form submit
    const [assigned, setAssigned] = useState(null)
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [tasktype, setTasktype] = useState("")
    const [deadline, setDeadline] = useState("")
    const [location, setLocation] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    completed: false,
                    assigned_to: 2,
                    title: title,
                    details: details,
                    task_type: tasktype,
                    deadline: deadline,
                    created: null,
                    location_id: location
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

    async function deleteTask(taskId){
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
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
        <>
            <ul>Tasks
                <button onClick={setForm}>Add New Task</button>
                {showForm &&
                    <form onSubmit={handleSubmit}>
                        * indicates a required field <br />
                        *Assign to: <select>
                            <option selected="true" disabled="disabled">User</option>
                            {users.map((user) => {
                                // return (
                                //     <option value={user.user_id}>{user.first_name} {user.last_name}</option>
                                // )
                                return (
                                    <option
                                        value={assigned}
                                        onChange={(e) => { setAssigned(e.target.value) }}
                                    >
                                        {user.user_id}</option>
                                )
                            })}
                        </select>
                        <br />
                        <label name="title">*Task Title: </label>
                        <input
                            for="title"
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <br />
                        <label name="task_type">Task Type: </label>
                        <input
                            for="task_type"
                            type="text"
                            value={tasktype}
                            onChange={(e) => { setTasktype(e.target.value) }}
                        />
                        <br />
                        <label name="details">Details: </label>
                        <input
                            for="details"
                            type="text"
                            value={details}
                            onChange={(e) => { setDetails(e.target.value) }}
                        />
                        <br />
                        <label name="deadline">Deadline </label>
                        <input
                            for="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => { setDeadline(e.target.value) }}
                        />
                        <br />
                        Location: <select>
                            <option selected="true" disabled="disabled">Places</option>
                            <option value="null">none</option>
                            {locations.map((location) => {
                                return (
                                    <option value={location} onChange={(e) => { setLocation(e.target.value) }} >{location.street}</option>
                                )
                            })}
                        </select>
                        <br />
                        <button type="submit" onClick={handleSubmit}>Add to List</button>
                    </form>
                }

                {tasks.map((task) => {
                    return (
                        <>
                            <br /><input type="checkbox"></input>
                            <label key={task.task_id}>{task.title}</label>
                            <button onClick={() => { navigate(`/tasks/${task.task_id}`) }}>Details</button>
                            <button onClick={() => {deleteTask(task.task_id); window.location.reload()}}>Delete</button>
                        </>
                    )
                })}<br />
            </ul>
        </>
    )
}
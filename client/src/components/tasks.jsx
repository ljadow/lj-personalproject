import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from './taskUpdates';
import { BiPencil, BiTrashAlt, BiPlus } from "react-icons/bi";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    //variables for the form submit
    const [assigned, setAssigned] = useState(null)
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [tasktype, setTasktype] = useState("")
    const [deadline, setDeadline] = useState("")
    const [location, setLocation] = useState(null)
    const [error, setError] = useState("")

    const navigate = useNavigate();

    function setForm() {
        setShowForm(!showForm)
        setError("")
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

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        try {
            if (title.length < 1) {
                return setError("Your task must include a title")
            } else {
                const response = await fetch("http://localhost:8080/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        completed: false,
                        assigned_to: assigned,
                        title: title,
                        details: details,
                        task_type: tasktype,
                        deadline: deadline,
                        location_id: location
                    })
                })
                const APIpost = await response.json();
                window.location.reload()
            }//else close
        }//try close
        catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={setForm}>Add New Task</button>
            <ul>Tasks
                {showForm &&
                    <form onSubmit={handleSubmit}>
                        * indicates a required field <br />
                        *Assign to: <select onChange={(e) => { setAssigned(e.target.value) }}>
                            <option selected="true" disabled="disabled">User</option>
                            {users.map((user) => {
                                return (<option value={user.user_id}>{user.first_name} {user.last_name}</option>)
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
                        <label name="deadline">*Deadline </label>
                        <input
                            for="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => { setDeadline(e.target.value) }}
                        />
                        {/* <br />
                        Location: <select onChange={(e) => { setLocation(e.target.value) }}>
                            {locations.map((location) => {
                                return (
                                    <option value={location.location_id}  >{location.street}</option>
                                )
                            })}
                        </select> */}
                        <br />
                        <button type="submit" onClick={handleSubmit}>Add to List</button>
                        {error ? <p id="taskCreateError">Task could not be created<br />Double-check all field inputs</p> : ""}
                    </form>
                }

                <table>
                    <thead>
                        <tr>
                            <th>Tasks</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => {
                            return (
                                <>
                                    <tr>
                                        {/* <br /><input type="checkbox" ></input> */}
                                        <td onClick={() => { navigate(`/tasks/${task.task_id}`) }}><label key={task.task_id}>{task.title}</label></td>
                                        <td>{task.completed ? "Done" : "To Do"}</td>
                                        <button onClick={() => { deleteTask(task.task_id); window.location.reload() }}><BiTrashAlt /></button>
                                    </tr>
                                </>
                            )
                        })}<br />
                    </tbody>
                </table>
            </ul>
        </>
    )
}
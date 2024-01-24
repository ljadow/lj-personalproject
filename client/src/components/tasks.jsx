import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from './taskUpdates';
import { BiTrashAlt, BiInfoCircle, BiCheckSquare, BiSquare } from "react-icons/bi";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    //variables for the form submit
    const [assigned, setAssigned] = useState(null)
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [tasktype, setTasktype] = useState("")
    const [deadline, setDeadline] = useState("")
    const [location, setLocation] = useState(null)
    const [error, setError] = useState("")
    //navigate
    const navigate = useNavigate();
    //search query
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks");
                const res = await req.json();
                setTasks(res)
            } catch (error) {
                console.log(error.message)
            }
        }
        async function fetchUsers() {
            try {
                const req = await fetch("http://localhost:8080/api/users");
                const res = await req.json();
                setUsers(res)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchTasks();
        fetchUsers();
    }, [])

    function setForm() {
        setShowForm(!showForm)
        setError("")
    }

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

    const filteredTasks = useMemo(() =>
        tasks.filter((task) => (
            task.title.toLowerCase().includes(query.toLowerCase())
            // || task.completed==status
        )),
        [tasks, query, status]
    );

    return (
        <>
            <button onClick={setForm}>Add New Task</button>
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
                    <br />
                    <button type="submit" onClick={handleSubmit}>Add to List</button>
                    {error ? <p id="taskCreateError">Task could not be created<br />Double-check all field inputs</p> : ""}
                </form>
            }
            <br />
            <input
                label="Search"
                placeholder="Search by task"
                onChange={e => setQuery(e.target.value)}
                value={query}
            />
            {/* <br />
            <label>Filter by Status</label>
            <select onChange={(e) => {dropFilter(e)}}>
                <option value="null">All</option>
                <option value="true" >Done</option>
                <option value="false" >To Do</option>
            </select> */}
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Tasks</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => {
                        return (
                            <>
                                <tr>
                                    <td>{task.completed ? <BiCheckSquare /> : <BiSquare />}</td>
                                    <td>{task.title}</td>
                                    <td>{new Date(task.deadline).toString().substring(4,15)}</td>
                                    <td><button onClick={() => { navigate(`/tasks/${task.task_id}`) }}><BiInfoCircle /></button>                                      <button onClick={() => { deleteTask(task.task_id); window.location.reload() }}><BiTrashAlt /></button></td>
                                </tr>
                            </>
                        )
                    })}<br />
                </tbody>
            </table>
        </>
    )
}
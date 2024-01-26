import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from './taskUpdates';
import { BiTrashAlt, BiInfoCircle, BiPlus, BiCheckbox } from "react-icons/bi";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [assigned, setAssigned] = useState(null)
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [tasktype, setTasktype] = useState("")
    const [deadline, setDeadline] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

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

    async function addTask(event) {
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
                // navigate(`/tasks/${APIpost.task_id}`)
                window.location.reload(false);
            }
        }
        catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const filteredTasks = useMemo(() =>
        tasks.filter((task) => (
            task.title.toLowerCase().includes(query.toLowerCase())
        )), [tasks, query]
    );

    return (
        <>
            <button onClick={setForm} title="Add New Task" className='formshow'><BiPlus /> Task</button>
            {showForm &&
                <form onSubmit={addTask} className="addForm">
                    <p id="requiredfield">* indicates a required field </p>
                    <br />
                    <label name="assigned_to">*Assign to:</label>
                    <select for="assigned_to" onChange={(e) => { setAssigned(e.target.value) }}>
                        <option selected="true" disabled="disabled">User</option>
                        {users.map((user) => {
                            return (<option key={user.user_id} value={user.user_id}>{user.first_name} {user.last_name}</option>)
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
                    <label name="deadline">*Deadline: </label>
                    <input
                        for="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => { setDeadline(e.target.value) }}
                    />
                    <br />
                    <button type="submit" onClick={addTask}>Add Task</button>
                    {error ? <p className="createError">Task could not be created<br />Double-check all field inputs</p> : ""}
                </form>
            }
            <br />
            <div id="taskfilters">
                <input
                    id="taskSearch"
                    placeholder='Search for tasks...'
                    label="Search"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
            </div>
            <br />
            <table className="mainTable">
                <thead>
                    <tr>
                        <th id="taskStatus">Status</th>
                        <th id="taskTitle">Task</th>
                        <th id="taskDeadline">Deadline</th>
                        <th id="taskActions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => {
                        async function handleCheck(event) {
                            try {
                                const response = await fetch(`http://localhost:8080/api/tasks/${task.task_id}`, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json", },
                                    body: JSON.stringify({
                                        completed: event
                                    })
                                })
                                const post = await response.json();
                            } catch (error) {
                                console.error(error)
                            }
                        }
                        return (
                            <>
                                <tr key={task.task_id}>
                                    <td>
                                        <input
                                            id="taskStatus"
                                            type="checkbox"
                                            defaultChecked={task.completed}
                                            onChange={(e) => { handleCheck(e.target.checked) }}
                                        >
                                        </input>
                                    </td>
                                    <td id="taskTitle">{task.title}</td>
                                    <td>{new Date(task.deadline).toString().substring(4, 15)}</td>
                                    <td>
                                        <button className="iconButton" title="See Info" onClick={() => { navigate(`/tasks/${task.task_id}`) }}><BiInfoCircle /></button>
                                        <button className="iconButton" title="Delete Task" onClick={() => { deleteTask(task.task_id); window.location.reload() }}><BiTrashAlt /></button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
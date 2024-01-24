import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPencil, BiTrashAlt } from "react-icons/bi";



export default function userList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [deleteError, setDeleteError] = useState("");

    //form variables
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [groupid, setGroupid] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks/users");
                const res = await req.json();
                setUsers(res)
            } catch (error) {
                console.log(error.message)
            }
        }
        async function fetchGroups() {
            try {
                const req = await fetch("http://localhost:8080/api/groups");
                const res = await req.json();
                setGroups(res)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchUsers();
        fetchGroups();
    }, [])

    function setForm() {
        setShowForm(!showForm)
        setError("")
    }

    async function deleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "DELETE",
            })
            const result = await response.json();
            window.location.reload();
        }
        catch (error) {
            setDeleteError("Cannot delete user if tasks are assigned to them")
            console.log(error)
        }
    }

    async function addUser(event) {
        event.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    first_name: firstname,
                    last_name: lastname,
                    group_id: groupid
                })
            })
            const APIpost = await response.json();
            window.location.reload()
        }
        catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={setForm}>Add New User</button>
            {showForm && <form>
                <label name="first_name">First Name: </label>
                <input
                    for="first_name"
                    type="text"
                    value={firstname}
                    onChange={(e) => { setFirstname(e.target.value) }}
                />
                <br />
                <label name="last_name">Last Name: </label>
                <input
                    for="last_name"
                    type="text"
                    value={lastname}
                    onChange={(e) => { setLastname(e.target.value) }}
                />
                <br />
                Group: <select onChange={(e) => { setGroupid(e.target.value) }}>
                    <option selected="true" disabled="disabled">Group Name</option>
                    {groups.map((group) => {
                        return (<option key={group.group_id} value={group.group_id}>{group.name}</option>)
                    })}
                </select>
                <br />
                <button type="submit" onClick={addUser}>Add User</button>
                {error ? <p id="taskCreateError">User could not be created<br />Double-check all field inputs</p> : ""}
            </form>}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th># of Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.first}</td>
                                <td>{user.last}</td>
                                {user.tasks > 0 ? <td onClick={() => { navigate(`/tasks/user/${user.id}`) }}>{user.tasks}</td> : <td>{user.tasks}</td>}
                                <td><button onClick={() => { navigate(`/users/${user.id}`) }}><BiPencil /></button>
                                    <button onClick={() => { deleteUser(user.id) }}><BiTrashAlt /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {deleteError}
        </>
    )
}
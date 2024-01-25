import { useState, useEffect } from 'react';
import { BiPlus, BiTrashAlt } from "react-icons/bi";


export default function GroupList({token}) {
    const [count, setCount] = useState([]);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showId, setShowId] = useState(null);
    const [error, setError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [groupname, setGroupname] = useState("");
    const [grouptype, setGrouptype] = useState("");

    function setForm() {
        setShowForm(!showForm)
        setError("")
    }

    function showUsers(groupid) {
        setShow(!show)
        setShowId(groupid)
    }

    useEffect(() => {
        async function fetchCounts() {
            try {
                const req = await fetch("http://localhost:8080/api/user-group/count");
                const res = await req.json();
                setCount(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchCounts();
    }, [])

    async function fetchUsers(groupid) {
        try {
            const req = await fetch(`http://localhost:8080/api/users/group/${groupid}`);
            const res = await req.json();
            setUsers(res)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function addGroup(event) {
        event.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/groups", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    name: groupname,
                    type: grouptype
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

    async function deleteGroup(groupid) {
        try {
            const response = await fetch(`http://localhost:8080/api/groups/${groupid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "DELETE",
            })
            const result = await response.json();
            window.location.reload();
        }
        catch (error) {
            setDeleteError("Cannot delete group that has users")
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={setForm} title="Add New Group"><BiPlus /> Group</button>
            {showForm && <form>
                <label name="name">Group Name: </label>
                <input
                    for="name"
                    type="text"
                    value={groupname}
                    onChange={(e) => { setGroupname(e.target.value) }}
                />
                <br />
                <label name="type">Group Type: </label>
                <input
                    for="type"
                    type="text"
                    value={grouptype}
                    onChange={(e) => { setGrouptype(e.target.value) }}
                /><br />
                <button type="submit" onClick={addGroup}>Add Group</button>
                {error ? <p className="createError">Group could not be created<br />Double-check field inputs</p> : ""}
            </form>}
            <table className='mainTable'>
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Type</th>
                        <th># Users</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {count.map((ele) => {
                        return (
                            <tr key={ele.group_id}>
                                <td title="Click to Show Users" onClick={() => {
                                    fetchUsers(ele.group_id); showUsers(ele.group_id)
                                }}>{ele.group_name}
                                    {show && ele.group_id === showId && users.length > 0 ? <ul id="groupusers">Users: {users.map((user) => <li key={user.user_id}>{user.first_name} {user.last_name}</li>)}</ul> : ''}
                                </td>
                                <td>{ele.group_type}</td>
                                <td>{ele.num_users}</td>
                                <td><button className="iconButton" title="Delete Group" onClick={() => { deleteGroup(ele.group_id) }}><BiTrashAlt /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {deleteError && <p className='deleteError'>{deleteError}</p>}
        </>
    )
}
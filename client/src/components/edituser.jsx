import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate();
    //form fields
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [groupid, setGroupid] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    //state vars
    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])
    const [current, setCurrent] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const req = await fetch(`http://localhost:8080/api/users/${id}`);
                const res = await req.json();
                fetchGroup(res.group_id)
                setFirstname(res.first_name)
                setLastname(res.last_name)
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
        fetchUser()
        fetchGroups();
    }, [])

    async function fetchGroup(id) {
        try {
            const req = await fetch(`http://localhost:8080/api/groups/${id}`);
            const res = await req.json();
            setCurrent(res.name)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function editUser(event) {
        event.preventDefault();
        setError("");
        try {
            if (groupid == null) {
                const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        first_name: firstname,
                        last_name: lastname
                    })
                })
                const APIpost = await response.json();
                setMessage("Edit Successful")
            } else {
                const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        first_name: firstname,
                        last_name: lastname,
                        group_id: groupid
                    })
                })
                const APIpost = await response.json();
                setMessage("Edit Successful")
            }
        }
        catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    return (
        <>
            <h3>Edit {users.first_name}'s Details</h3>
            <form onSubmit={editUser}>
                <label name="first_name">First Name: </label>
                <input
                    for="first_name"
                    type="text"
                    value={firstname}
                    placeholder={users.first_name}
                    onChange={(e) => { setFirstname(e.target.value) }}
                />
                <br />
                <label name="last_name">Last Name: </label>
                <input
                    for="last_name"
                    type="text"
                    value={lastname}
                    placeholder={users.last_name}
                    onChange={(e) => { setLastname(e.target.value) }}
                />
                <br />

                <label>Group:</label>
                <select onChange={(e) => { setGroupid(e.target.value) }}>
                    <option selected="true" disabled="disabled" > {current} </option>
                    {groups.map((group) => {
                        return (<option value={group.group_id}>{group.name}</option>)
                    })}
                </select><br />
                <button type="submit">Submit Changes</button>
                {error && <h4>{error}</h4>}
                {message && <h4>{message}</h4>}
            </form>
            <button onClick={() => { navigate(-1) }}>Go Back</button>
        </>
    )
}
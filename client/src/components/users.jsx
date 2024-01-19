import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function userList() {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [numTasks, setNumTasks] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const req = await fetch("http://localhost:8080/api/users/");
                const res = await req.json();
                setUsers(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchUsers();
    }, [])

    async function userTasks(user_id) {
        try {
            const req = await fetch(`http://localhost:8080/api/tasks/user/${user_id}`);
            const res = await req.json();
            setTasks(res)
            setNumTasks(res.length)
            console.log(numTasks)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Group Id</th>
                <th>Tasks</th>
            </tr>
            {users.map((user) => {
                return (
                    <tr>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.group_id}</td>
                        <td>{userTasks(user.user_id)}</td>
                    </tr>
                )
            })}
        </table>
    )
}
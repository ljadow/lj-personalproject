import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function userList() {
    
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const req = await fetch("http://localhost:8080/api/tasks/users");
                const res = await req.json();
                setUsers(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchUsers();
    }, [])

    return (
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th># of Tasks</th>
            </tr>
            {users.map((user) => {
                return (
                    <tr>
                        <td>{user.first}</td>
                        <td>{user.last}</td>
                        <td>{user.tasks}</td>
                    </tr>
                )
            })}
        </table>
    )
}
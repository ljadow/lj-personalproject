import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupList() {
    const [count, setCount] = useState([]);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showId, setShowId] = useState(null);

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

    return (
        <table>
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Type</th>
                    <th># Users</th>
                </tr>
            </thead>
            <tbody>
                {count.map((ele) => {
                    return (
                        <tr key={ele.group_id}>
                            <td onClick={() => {
                                fetchUsers(ele.group_id); showUsers(ele.group_id)
                            }}>{ele.group_name}
                                {show && ele.group_id === showId ? <table id="groupusers">Users: {users.map((user) => <tr key={user.user_id}>{user.first_name} {user.last_name}</tr>)}</table> : ''}
                            </td>

                            <td>{ele.group_type}</td>
                            <td>{ele.num_users}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
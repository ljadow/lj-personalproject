import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function createNewGroup() {
    async function newGroup() {
        try {
            const req = await fetch("http://localhost:8080/api/user-group/count");
            const res = await req.json();
            setCount(res)
            console.log("count")
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default function GroupList() {
    const [count, setCount] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const req = await fetch("http://localhost:8080/api/user-group/count");
                const res = await req.json();
                setCount(res)
                console.log("count")
                console.log(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchCounts();
    }, [])

    return (
        <table>
            <tr>
                <th>Group Name</th>
                <th>Type</th>
                <th># Users</th>
            </tr>
            {count.map((ele) => {
                return (
                    <tr>
                        <td>{ele.group_name}</td>
                        <td>{ele.group_type}</td>
                        <td>{ele.num_users}</td>
                    </tr>
                )
            })}
        </table>
    )
}
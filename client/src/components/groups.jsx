import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupList() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchGroups() {
            try {
                const req = await fetch("http://localhost:8080/api/groups");
                const res = await req.json();
                setGroups(res)
                console.log(res)
            } catch (error) {
                console.log(error.message)
            }
        } fetchGroups();
    }, [])

    return( 
        <>
        {groups.map((group)=>{
            return(
                <>
                <ul>{group.name}</ul>
                </>
            )
        })}
        </>
    )
}
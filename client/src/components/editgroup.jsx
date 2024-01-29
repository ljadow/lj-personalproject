import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { baseUrl } from './context'

export default function EditGroup() {
    const { id } = useParams()
    const navigate = useNavigate()
    const url = useContext(baseUrl)
    //form fields
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [groupname, setGroupname] = useState("")
    const [grouptype, setGrouptype] = useState("")
    //state vars
    const [group, setGroup] = useState([])
    
    useEffect(() => {
        async function fetchGroup() {
            try {
                const req = await fetch(`${url}/api/groups/${id}`)
                const res = await req.json()
                setGroup(res)
                setGroupname(res.name)
                setGrouptype(res.type)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchGroup();
    }, [])

    async function putEdit(event) {
        event.preventDefault()
        setError("")
        setMessage("")
        try {
            if (groupname.length > 50 || grouptype.length > 50) {
                setError("Inputs must be fewer than 50 characters")
            } else {
                const response = await fetch(`${url}/api/groups/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({
                        name: groupname,
                        type: grouptype
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
            <h3>Edit {group.name} Group Details</h3>
            <form onSubmit={putEdit}>
                <label name="group_name">Group Name: </label>
                <input
                    for="group_name"
                    type="text"
                    value={groupname}
                    placeholder={group.name}
                    onChange={(e) => { setGroupname(e.target.value) }}
                />
                <br />
                <label name="group_type">Group Type: </label>
                <input
                    for="group_type"
                    type="text"
                    value={grouptype}
                    placeholder={group.type}
                    onChange={(e) => { setGrouptype(e.target.value) }}
                />
                <br />
                <button type="submit">Submit Changes</button>
                {error && <h4>{error}</h4>}
                {message && <h4>{message}</h4>}
            </form>
            <button onClick={() => { navigate(-1) }}>Go Back</button>
        </>
    )
}
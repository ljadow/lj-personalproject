import { useContext } from "react"
import { baseUrl } from './context'

export default async function markComplete(taskid) {
    const url = useContext(baseUrl)

    try {
        const response = await fetch(`${url}/api/tasks/${taskid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                completed: true,
            })
        })
        const APIpost = await response.json();
        console.log(APIpost)
    }
    catch (error) {
        console.log(error.message)
    }
    window.location.reload()
}

export async function markIncomplete(taskid) {
    const url = useContext(baseUrl)

    try {
        const response = await fetch(`${url}/api/tasks/${taskid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                completed: false,
            })
        })
        const APIpost = await response.json()
        console.log(APIpost)
    }
    catch (error) {
        console.log(error.message)
    }
    window.location.reload()
}


export async function deleteTask(taskId) {
    const url = useContext(baseUrl)

    try {
        const response = await fetch(`${url}/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "DELETE",
        })
        const result = await response.json()
    }
    catch (error) {
        console.log(error)
    }
}



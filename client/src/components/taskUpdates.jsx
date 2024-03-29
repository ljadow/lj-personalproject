import { useNavigate } from "react-router-dom"
// https://tasklist-api-juuc.onrender.com
// http://localhost:8080

export default async function markComplete(taskid) {
    const nav = useNavigate()
    try {
        const response = await fetch(`https://tasklist-api-juuc.onrender.com/api/tasks/${taskid}`, {
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
    // window.location.reload()
    nav("/")
}
export async function markIncomplete(taskid) {
    const nav = useNavigate()
    try {
        const response = await fetch(`https://tasklist-api-juuc.onrender.com/api/tasks/${taskid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                completed: false,
            })
        })
        const APIpost = await response.json();
        console.log(APIpost)
    }
    catch (error) {
        console.log(error.message)
    }
    // window.location.reload()
    nav("/")

}


export async function deleteTask(taskId) {
    const nav = useNavigate()
    try {
        const response = await fetch(`https://tasklist-api-juuc.onrender.com/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "DELETE",
        })
        const result = await response.json();
        console.log(result)
    }
    catch (error) {
        console.log(error)
    }
    // window.location.reload()
    nav("/")
}



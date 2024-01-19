import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

export default async function markComplete(taskid) {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskid}`, {
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
    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskid}`, {
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
    window.location.reload()
}


export async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "DELETE",
        })
        const result = await response.json();
    }
    catch (error) {
        console.log(error)
    }
}



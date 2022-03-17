import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/main.css'

export const GetNote = () => {
    const [task, setTask] = useState({
        name: '', completed: false,
        _id: ''
    })
    let url = process.env.REACT_APP_URL

    const [updateTask, setUpdateTask] = useState({
        name: task?.name, completed: false
    })

    let { id } = useParams()
    // console.log(id, typeof id);

    useEffect(() => {
        fetch(`${url}/api/v1/tasks/${id}`).then(res => res.json()).then(data => setTask(data.task))

    }, [])

    function handleSubmit() {
        console.log(task);
        fetch(`${url}/api/v1/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name: task.name,
                completed: task.completed
            })
        }).then(res => res.json()).then(data => { console.log(data); })
    }


    return (
        <div>
            <div className="container">
                <div className="single-task-form form">
                    <h4>Edit Task</h4>
                    <div className="form-control">
                        <label>Task ID</label>
                        <p className="task-edit-id">{task._id}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={task.name} onChange={e => setTask({ ...task, [e.target.name]: e.target.value })} name="name" className="task-edit-name" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="completed">completed</label>
                        <input type="checkbox" onChange={e => setTask({ ...task, [e.target.name]: e.target.checked })} checked={task.completed} name="completed" className="task-edit-completed" />
                    </div>
                    <button type="submit" className="block btn task-edit-btn" onClick={handleSubmit}>edit</button>
                    <div className="form-alert"></div>
                </div>
                <Link to='/' className="btn back-link">back to tasks</Link>
            </div>
        </div>
    )
}

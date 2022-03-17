import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import '../styles/normalize.css'
export const Home = () => {
    let alert = useRef("n")
    const [tasks, setTasks] = useState([])
    const [addTask, setAddTask] = useState([])
    let url = process.env.REACT_APP_URL

    useEffect(() => {
        console.log(url);
        // console.log(alert.current.innerHtml);
        fetch(`${url}/api/v1/tasks`).then(res => res.json()).then(data => setTasks(data.tasks))
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(addTask);
        fetch(`${url}/api/v1/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name: addTask,
            })
        }).then(res => {
            if (res.status == 200) {
                setTimeout(() => {
                    alert.current.innerText = "";
                }, 1000);
                alert.current.innerText = "success, task added";
                return res.json()
            }
            else {
                setTimeout(() => {
                    alert.current.innerText = "";
                }, 1000);
                alert.current.innerText = "Some error occured";
                return res.json()
            }
        })
            .then(data => {
                console.log(data.task);
                setTasks(tasks.concat(data.task))
                setAddTask([])
            })
        // await console.log(addTask);
        // await setTasks(tasks.concat(addTask))
    }

    function deleteTask(id) {
        fetch(`${url}api/v1/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name: addTask,
            })
        }).then(res => res.json()).then(data => console.log(data))
        // console.log(id);
        setTasks(tasks.filter(task => task._id != id))
    }

    return (
        <div>
            <form className="task-form" onSubmit={handleSubmit}>
                <h4>task manager</h4>
                <div className="form-control">
                    <input
                        type="text"
                        name="name"
                        className="task-input"
                        placeholder="e.g. wash dishes"
                        value={addTask}
                        onChange={e => setAddTask(e.target.value)}
                    />
                    <button type="button" className="btn submit-btn" onClick={handleSubmit}>submit</button>
                </div>
                <div className="form-alert" ref={alert} ></div>
            </form>
            <section className="tasks-container">
                <p className="loading-text">Loading...</p>
                {tasks && tasks.map(task => (
                    <div className="tasks" key={task._id}>
                        <div className={`single-task ${task.completed ? 'task-completed' : ''} `}>
                            <h5>
                                {task.completed ? <span><i className="far fa-check-circle"></i></span> : ''}
                                {task.name}</h5>
                            <div className="task-links">
                                <Link to={`/tasks/${task._id}`} className="edit-link">
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <button type="button" className="delete-btn" onClick={(e) => deleteTask(e.currentTarget.dataset.id)} data-id={task._id}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                }

                {/* {
                    tasks && tasks.map(t => console.log(t))
                } */}
            </section>



        </div>
    )
}

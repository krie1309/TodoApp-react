/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AddIcon from '@mui/icons-material/Add';

import DisplayPendingTodos from "./DisplayPendingTodos/DisplayPendingTodos";

// import Todos from "./Utils/Data";

import "./TodoApp.css";

const TodoApp = () => {
    const [obj, setObj] = useState({ task: "", color: "#000" });
    const [data, setData] = useState([]);

     const setLocalTodos= (todos) => localStorage.setItem("TodoData", JSON.stringify(todos));
     const getLocalTodos= () => JSON.parse(localStorage.getItem("TodoData"));

    useEffect(() => {
        let todos = getLocalTodos();
        todos && setData(todos)
        // console.log(data);
    }, []);
    
    useEffect(() => {
        setLocalTodos(data);
        console.log(data)
    }, [data]);
    

    const handleChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        setObj({ ...obj, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (obj.task === undefined || obj.task === "" || obj.color === "#000" || obj.color === "#000000") {
            toast.error("Enter task & Select Color");
            return;
        }
        
        let { task, color } = obj;
        setData([
            ...data,
            {
                task,
                color,
                id: Math.random(),
                isCompleted: false,
                date: new Date().toLocaleString(),
            },
        ]);
        
        toast.success("Added Successfully!");
        setObj({ task: "", color: "#000" });
    };

    const handleDelete = (ind) => {
        let newData = data.filter((item) => item.id !== ind);
        setData(newData);
        setObj({ task: "", color: "#000" });
        toast.success("Deleted Successfully!");
    };
    
    const handleComplete = (item, ind) => {setObj({ task: "", color: "#000" })
        console.log(item);
        data.map((item) => {
            if (item.id === ind) {
                item.isCompleted = true;
                item.date = new Date().toLocaleString();
            }
        });
        // console.log(data)
        setObj({ task: "", color: "#000" });
        setLocalTodos(data);
        toast.success("Completed Successfully!");
    };


    return (
        <div className="maincontainer">
            <div className="inputcontainer">
                <input
                    type="text"
                    name="task"
                    id="task"
                    value={obj.task}
                    placeholder="Enter task"
                    onChange={handleChange}
                />
                <input
                    type="color"
                    name="color"
                    id="color"
                    value={obj.color}
                    onChange={handleChange}
                />
                <button onClick={handleClick} style={{ "--i": "#d63384" }}>
                    <AddIcon />
                </button>
            </div>

            <div className="outputcontainer">
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    title="Pending"
                />
                <DisplayPendingTodos
                    data={data}
                    handleDelete={handleDelete}
                    title="Completed"
                />
            </div>
            <ToastContainer
                theme="dark"
                position="bottom-right"
                style={{ fontSize: "14px" }}
                autoClose={2000}
            />
        </div>
    );
};

export default TodoApp;

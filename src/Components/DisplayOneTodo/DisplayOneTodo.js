import React from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import "./DisplayOneTodo.css";

const DisplayOneTodo = ({ item, handleDelete, handleComplete, title, }) => {
    return (
        <>
            <div className="box" style={{ "background": `${item.color}` }}>
                <div className="toprow">
                    <div className="task">{item.task}</div>
                </div>
                <div className="bottomrow">
                    <div className="task">{item.date}</div>
                </div>
                <div className="button">
                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{ "--i": "#F00" }}
                    >
                        <DeleteIcon />
                    </button>
                    {title === "Pending" && (
                        <>
                            <button
                                onClick={() => handleComplete(item, item.id)}
                                style={{ "--i": "#20c997" }}
                            >
                                <DoneAllIcon />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DisplayOneTodo;

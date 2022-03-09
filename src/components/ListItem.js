import React, { useState } from "react";

const ListItem = props => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className="text-center leading-loose bg-slate-200 hover:bg-slate-400 rounded-md p-2">
            <button onClick={() => setDropdown(!dropdown)}>
                <b>To-do: {props.title}</b>   
            </button>
            
            {dropdown && (
                <div className="flex flex-col text-left bg-slate-300 rounded-md p-2">
                    <div>
                        <b> - Description</b>: {props.description}<br />
                        <b> - Deadline</b>: {props.deadline}<br />
                        <b> - Priority</b>: {props.priority}<br />

                        <div className={props.completed ? (new Date() > new Date(props.deadline) ? "text-red-500" : "text-green-500") : "text-gray-600"}>
                            <b> - Completed on </b>: {props.completed ? new Date().toLocaleDateString() : "N/A"}
                        </div>
                    </div>
                    {!props.completed && (
                        <div> 
                            <button className="bg-red-500 rounded-md hover:bg-red-700 p-2 px-8 m-2" onClick={() => props.deleteTodo(props.id)}>Delete</button>
                            <button className="bg-green-500 rounded-md hover:bg-green-700 p-2 m-2" onClick={() => props.completeTodo(props.id)}>Mark as Complete</button>
                            <button className="bg-blue-500 rounded-md hover:bg-blue-700 p-2 px-10 m-2" onClick={() => props.editTodo(props.id)}>Edit</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItem;
import React, { useEffect } from "react";
import { useState } from "react";

import ListItem from "./ListItem";
import SplitPane from "react-split-pane";

const List = () => {
    const [items, setItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [sortBy, setSortBy] = useState("date");

    // re-render the list every time the sort by changes
    useEffect(() => {
        let sortedItems = sortItems([...items], sortBy);
        setItems(sortedItems);

        let sortedCompletedItems = sortItems([...completedItems], sortBy);
        setCompletedItems(sortedCompletedItems);
    }, [sortBy]);

    const addItem = () => {
        let title = window.prompt("Enter a title for your todo");
        if (!title) return;

        let description = window.prompt("Enter a description for your todo");
        if (!description) return;

        let deadline = window.prompt("Enter a deadline for your todo (MM/DD/YYYY)");
        if (!deadline) return;
        // check if deadline meets the format MM/DD/YYYY
        if (!deadline.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/[0-9]{4}$/)) return;

        let priority = window.prompt("Enter a priority for your todo (1 = highest, 4 = lowest)");
        if (!priority) return;
        // check if priority is a number between 1 and 4
        if (!priority.match(/^[1-4]$/)) return;

        let item = {
            title: title,
            description: description,
            deadline: deadline,
            priority: priority
        };

        // sort items by whatever sortBy is
        let sortedItems = sortItems([...items, item], sortBy);
        setItems(sortedItems);
    };

    const deleteItem = index => {
        setItems(items.filter((item, i) => i !== index));
    };

    const editItem = index => {
        let variable = window.prompt("What variable would you like to edit? (title, description, deadline, priority)");
        if (!variable) return;
        if (variable !== "title" && variable !== "description" && variable !== "deadline" && variable !== "priority") return;

        let value = window.prompt("What would you like to change it to? Old value: " + items[index][variable]);
        if (!value) return;
        if (value == "deadline" && !value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/[0-9]{4}$/)) return;
        if (value == "priority" && !value.match(/^[1-4]$/)) return;

        // pop item from index and store it in variable item
        let item = items.splice(index, 1)[0];
        item[variable] = value;

        let sortedItems = sortItems([...items, item], sortBy);
        setItems(sortedItems);
    }

    const completeItem = index => {
        const item = items[index];
        deleteItem(index);

        let sortedItems = sortItems([...completedItems, item], sortBy);
        setCompletedItems(sortedItems);
    };

    const sortItems = (list) => {
        if (sortBy == "date") return list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        else if (sortBy == "priority") return list.sort((a, b) => a.priority - b.priority);
    }

    return (
        <SplitPane defaultSize='50%'>
            <div className="flex flex-col overflow-auto h-full">
            <h3 className="p-2 m-2"><b>To-do</b></h3>
                <button className="bg-red-500 rounded-md hover:bg-red-700 p-2 m-2" onClick={() => addItem()}>Add To-do</button>
                {items.map((item, index) =>
                    <div className="p-2">
                        <ListItem id={index} title={item.title} description={item.description} deadline={item.deadline} priority={item.priority} completed={false} deleteTodo={() => deleteItem(index)} completeTodo={() => completeItem(index)} editTodo={() => editItem(index)} />
                    </div>
                )}
            </div>
            <div className="flex flex-col overflow-auto h-full">
                <div className="flex justify-between">
                    <h3 className="p-2 m-2"><b>Completed To-dos</b></h3>
                    {/* Create "sort by" dropdown */}
                    <select className="bg-gray-200 rounded-md hover:bg-gray-300 p-2 m-2" onChange={(e) => {setSortBy(e.target.value)}}>
                        <option value="date">Sort by Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
                {completedItems.map((item, index) =>
                    <div className="p-2">
                        <ListItem id={index} title={item.title} description={item.description} deadline={item.deadline} priority={item.priority} completed={true} />
                    </div>
                )}
            </div>
        </SplitPane>
    );
};

export default List;

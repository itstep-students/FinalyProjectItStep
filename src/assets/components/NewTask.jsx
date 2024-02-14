import { useState } from "react";

export default function NewTask({onAdd}) {
    const [task, setTask] = useState('');

    function handleChange(e) {
        setTask(e.target.value);
    }

    function handleClick() {
        if (task.trim() === '') {
            return;
        }
        onAdd(task);
        setTask('');

    }

    return (
        <div className="flex items-center gap-6 mb-6">
            <input value={task} onChange={handleChange} className="w-1/2 px-2 py-2 text-xl rounded-lg bg-stone-200" type="text"/>
            <button onClick={handleClick} className="w-32 rounded-lg px-4 text-center text-white py-2 bg-stone-950 opacity-75  text-xl  hover:opacity-100  transition-opacity">Add Task</button>
        </div>
    );
}

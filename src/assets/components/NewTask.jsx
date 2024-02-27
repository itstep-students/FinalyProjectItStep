import { useState } from "react";

export default function NewTask({onAdd}) {
    const [task, setTask] = useState({name: '', date: '—', time: '—'});

    function handleChange(e) {
        setTask({name: e.target.value, date: task.date, time: task.time});
    }
    function handleDateChange(e){
      setTask(oldParam => {
          return {
              ...oldParam,
              date: e.target.value
          }
      });
    }

    function handleTimeChange(e){
        setTask(oldParam => {
            return {
                ...oldParam,
                time: e.target.value
            }
        });
    }

    function handleClick() {
        if (task.name.trim() === '') {
            return;
        }
        onAdd({name: task.name, date: task.date, time: task.time});
        setTask({name: '', date: '', time: ''});

    }

    return (
        <div className="flex items-center gap-6 mb-6">
            <input value={task.name} onChange={handleChange} className="w-1/2 px-2 py-1 text-xl rounded-lg bg-stone-200" type="text"/>
            <div className="flex flex-col items-center gap-2"><label className="text-xl text-stone-700" htmlFor="taskDate">Due Date</label>
                <input value={task.date} onChange={handleDateChange} className="outline-none bg-stone-50 text-stone-700 select-none" name="taskDate" type="date"/>
            </div>
            <div className="flex flex-col items-center gap-2"><label className="text-xl text-stone-700" htmlFor="taskTime">Deadline</label>
                <input value={task.time} onChange={handleTimeChange} className="outline-none bg-stone-50 text-stone-700 select-none" name="taskTime" type="time"/>
            </div>

            <button onClick={handleClick} className="w-32 rounded-lg px-4 text-center text-white py-2 bg-stone-950 opacity-75  text-xl  hover:opacity-100  transition-opacity">Add Task</button>
        </div>
    );
}

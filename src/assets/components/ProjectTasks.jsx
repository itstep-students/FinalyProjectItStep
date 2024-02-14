import NewTask from "./NewTask.jsx";

export default function ProjectTasks({onDelete, onAdd, tasksList}) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasksList.length === 0 && <p className="mb-4">No tasks yet</p>}
            {tasksList.length > 0 && <ul className="rounded-lg">{tasksList.map(item =>
                <li className="flex justify-between text-xl" key={item.id}><span className="mx-0 my-auto">{item.text}</span>
                    <button onClick={() => onDelete(item.id)} className="mr-4 px-4 py-3 font-medium text-black font-sans hover:text-red-700 transition-colors">Clear</button></li>)}</ul>}
        </div>
    );
}
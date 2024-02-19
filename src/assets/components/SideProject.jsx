import ProjectTasks from "./ProjectTasks.jsx";
import {options} from "./dateOptions.js";

export default function SideProject({project, onDelete, onDeleteTask, onAddTask, taskList}) {
    let currentLang = 'en-US';

    const formatDate = new Date(project.date).toLocaleDateString(currentLang, options)


    return (
        <div className="w-8/12 font-sans px-16 py-12">
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-5xl font-bold my-4 break-all w-full">{project.title}</h2>
                    <button onClick={onDelete} className="mr-4 px-4 py-3 text-xl font-medium text-black font-sans hover:text-red-700 transition-colors">Delete</button>
                </div>
                <p className="text-2xl text-stone-500 mb-6">{formatDate}</p>
                <p className="w-full break-all text-xl py-4 border-solid border-b-2">{project.text}</p>
            </div>
            <ProjectTasks tasksList={taskList} onAdd={onAddTask} onDelete={onDeleteTask} />
        </div>
    );
}
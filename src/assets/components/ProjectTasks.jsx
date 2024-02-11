import NewTask from "./NewTask.jsx";

export default function ProjectTasks() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Tasks</h2>
            <NewTask />
            <p className="mb-4">No tasks yet</p>
            <ul>

            </ul>
        </div>
    );
}
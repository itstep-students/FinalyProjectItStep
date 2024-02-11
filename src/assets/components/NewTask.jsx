export default function NewTask() {
    return (
        <div className="flex items-center gap-6 mb-6">
            <input className="w-1/2 px-2 py-2 text-xl rounded-lg bg-stone-200" type="text"/>
            <button className="w-32 rounded-lg px-4 text-center text-white py-2 bg-stone-950 opacity-75  text-xl  hover:opacity-100  transition-opacity">Add Task</button>
        </div>
    );
}

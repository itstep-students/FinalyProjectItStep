import startedImg from '../no-projects.png';

export default function StartedPage({isStart}) {

    return (
        <div className="flex gap-8 flex-grow flex-col justify-center items-center mb-60">
            <img className="w-20 h-20" src={startedImg} alt="list"/>
            <h2 className="text-stone-700 text-3xl font-medium font-sans">No Project Selected</h2>
            <p className="text-stone-700 text-2xl font-sans">Select a project or get started with a new one</p>
            <button onClick={isStart} className="rounded-lg opacity-75 px-6 py-3 bg-stone-950 text-xl text-white font-sans hover:opacity-85 transition-opacity">Create new project</button>
        </div>

);
}
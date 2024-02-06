import img from '../no-projects.png';

import {useState} from "react";

export default function Project() {
    const [isStartedPage, setNewProject] = useState(true);

    function handleNewProject(value) {
        setNewProject(value)
    }

    const startedPage = <div className="flex gap-8 flex-grow flex-col justify-center items-center mb-60">
        <img className="w-20 h-20" src={img} alt="list"/>
        <h2 className="text-stone-700 text-3xl font-medium font-sans">No Project Selected</h2>
        <p className="text-stone-700 text-2xl font-sans">Select a project or get started with a new one</p>
        <button onClick={()=> handleNewProject(false)} className="rounded-lg opacity-75 px-6 py-3 bg-stone-950 text-xl text-white font-sans hover:opacity-85 transition-opacity">Create new project</button>
    </div>;

    const newProjectPage = <div className="flex gap-8 flex-grow flex-col justify-center items-center mb-60">
        <div className="w-full pl-14 pr-40 mt-32">
            <div className="w-full text-end mb-8">
                <button className="opacity-100 mr-4 px-4 py-2 text-xl font-medium text-black font-sans hover:opacity-75 transition-opacity">Cancel</button>
                <button className="rounded-lg opacity-100 px-8 py-3 bg-black text-xl text-white font-sans hover:opacity-80 transition-opacity">Save</button>
            </div>

            <div className="mb-6">
                <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-text">Title</label>
                <input className="font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600" id="input-text" type="text"/>
            </div>
            <div className="mb-6">
                <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="textarea">Description</label>
                <textarea className="resize-none h-32 font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-10 bg-stone-300 focus:border-stone-600" id="textarea"></textarea>
            </div>
            <div>
                <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-date">Due date</label>
                <input className="font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600" id="input-date" type="date"/>
            </div>

        </div>
    </div>;

    return (
        <>
            {isStartedPage ? startedPage : newProjectPage}
        </>

    );
}
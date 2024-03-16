import startedImg from '../no-projects.png';
import {languages} from "./languages.js";

export default function StartedPage({isStart, languages}) {

    return (
        <div className="flex gap-8 flex-grow flex-col justify-center items-center mb-60">
            <img className="w-20 h-20" src={startedImg} alt="list"/>
            <h2 className="text-stone-900 text-3xl font-medium font-sans">{languages.startPageTitle}</h2>
            <p className="text-stone-900 text-2xl font-sans">{languages.startPageText}</p>
            <button onClick={isStart} className="rounded-lg shadow-2xl opacity-85 px-6 py-3 bg-stone-700 text-xl text-white font-sans hover:opacity-100 transition-opacity">{languages.startPageButton}</button>
        </div>

);
}
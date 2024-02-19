import NewTask from "./NewTask.jsx";

import dateIcon from '/calendar.svg';
import {options} from "./dateOptions.js";

const addToFavoriteIcon =  <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="yellow" stroke-width="1.5"/>
</svg>;
export default function ProjectTasks({onDelete, onAdd, tasksList}) {
    let currentLang = 'en-US';

    const formatDate = new Date().toLocaleDateString(currentLang, options);

    let dateFlag = {color: ''};
    const currentMs = new Date().getTime();

    const ONE_WEEK_MS = 604800000;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {tasksList.length === 0 && <p className="mb-4">No tasks yet</p>}
            {tasksList.length > 0 && <ul className="rounded-lg">{tasksList.map(item => {
                const itemMs = new Date(item.dueDate).getTime();

                if ((item.dueDateFormat === formatDate) || currentMs - itemMs >= 0) {
                    dateFlag.color = ' text-red-600';
                } else if (itemMs - currentMs <=  ONE_WEEK_MS) {
                    dateFlag.color = ' text-green-600'
                } else if ((itemMs - currentMs >  ONE_WEEK_MS)){
                    dateFlag.color = ' text-gray-600'
                }
               return <li className="text-xl rounded-lg bg-stone-300 my-4 p-2" key={item.id}>
                    <div className="flex justify-between">
                    <span className="break-all mx-0 my-auto">{item.text}</span>
                    <div className="flex"> <button onClick={() => onDelete(item.id)} className=" px-4 py-3 font-medium text-black font-sans hover:text-red-700 transition-colors">Clear</button>
                        <button className="">{addToFavoriteIcon}</button></div>
                    </div>
                    <div className="font-bold flex gap-2"><img src={dateIcon} alt="date"/><span className={`font-medium ${dateFlag.color}`}>{item.dueDateFormat}</span></div>
                   </li>})}</ul>}
        </div>
    );
}
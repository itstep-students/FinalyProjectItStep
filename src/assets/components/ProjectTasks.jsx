import {useRef} from "react";


import NewTask from "./NewTask.jsx";

import dateIcon from '/calendar.svg';
import clockIcon from '/clock.svg';
import reminderIcon from '/reminder-bell.svg';
import {options} from "./dateOptions.js";
import FavoriteIcon from "./FavoriteIcon.jsx";
import FavoriteTask from "./FavoriteTask.jsx";
import ReminderModal from "./ReminderModal.jsx";


export default function ProjectTasks({onDelete, onAdd, tasksList, favoriteList, onAddFavorite, handleDeleteFavorite, remove, projectObj, onAddReminder, reminders}) {

    const dialog = useRef();
    const currentTask= {task: ''};

    function handleOpenModal(task) {
        currentTask.task = task;
        const isAlreadySetReminder = reminders.find(reminder => reminder.taskId === task.id);
        dialog.current.open();

        if (isAlreadySetReminder) {
            dialog.current.change();
        }
    }


    let currentLang = 'en-US';

    const formatDate = new Date().toLocaleDateString(currentLang, options);

    let colorFlag = {date: '', time: ''};
    const currentMs = new Date().getTime();

    const ONE_WEEK_MS = 604800000;

    function timeChecker(item) {
        if (item.time === '—') {
            colorFlag.time = ' text-gray-600';
        }
    }


    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Tasks</h2>
            <NewTask onAdd={onAdd} />
            {(tasksList.length === 0 && favoriteList.length === 0) && <p className="mb-4">No tasks yet</p>}
            <FavoriteTask reminders={reminders} onAddReminder={onAddReminder} projectObj={projectObj} remove={remove} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={onAddFavorite} favorite={favoriteList}/>
            {tasksList.length > 0 && <ul className="rounded-lg">{tasksList.map(item => {
                let itemMs = new Date(item.dueDate).getTime();
                let reminder;
                let reminderDate;
                let reminderTime;
                if (reminders.find(reminder => (reminder.projectId === projectObj.id) && (reminder.taskId === item.id))) {
                    reminder = (reminders.find(reminder => ((reminder.projectId === projectObj.id) && (reminder.taskId === item.id))));
                    reminderDate = new Date(reminder.date).toLocaleDateString(currentLang, options);
                    reminderTime = reminder.time;
                }
                if ((item.dueDateFormat === formatDate) || currentMs - itemMs >= 0) {
                    colorFlag.date = ' text-red-600';
                    colorFlag.time = ' text-red-600';
                   timeChecker(item);
                } else if (itemMs - currentMs <=  ONE_WEEK_MS) {
                    colorFlag.date = ' text-green-600';
                    colorFlag.time = ' text-green-600';
                    timeChecker(item);
                } else if ((itemMs - currentMs >  ONE_WEEK_MS) || (item.dueDate === '')){
                    colorFlag.date = ' text-gray-600';
                    colorFlag.time = ' text-gray-600';
                }
               return <li className="text-xl rounded-lg bg-stone-300 my-4 p-2 animate-ping-once shadow-xl" key={item.id}>
                    <div className="flex justify-between">
                    <span className="break-all mx-0 my-auto">{item.text}</span>
                    <div className="flex"> <button onClick={() => onDelete(item.id)} className="px-4 py-3 font-medium text-black font-sans hover:text-red-700 transition-colors">Clear</button>
                        <FavoriteIcon remove={remove} isFavorite={false} onAddFavorite={() => {onAddFavorite(item.id)}}
                        /></div>
                    </div>
                   <div className="font-bold flex justify-between">
                       <div className="flex gap-5">
                           <div className="flex justify-center items-center gap-2">
                               <img src={dateIcon} alt="date"/><span className={`font-medium ${colorFlag.date}`}>{item.dueDateFormat}</span>
                           </div>
                           <div className="flex justify-center items-center gap-2">
                               <img src={clockIcon} alt="time"/><span className={`font-medium ${colorFlag.time}`}>{item.time}</span>
                           </div>
                       </div>

                       <div className="flex justify-center items-center gap-2">
                           <span className='font-medium'>{(reminderDate === 'Invalid Date' ? '' : reminderDate) || ''}{` ${reminderTime || ''}`}</span> <img onClick={() => handleOpenModal(item)} className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" src={reminderIcon} alt="reminder"/>
                       </div>
                   </div>
                   <ReminderModal reminders={reminders} onAddReminder={onAddReminder} projectObj={projectObj} currentTask={currentTask} ref={dialog} />
                   </li>})}</ul>}
        </div>
    );
}
import FavoriteIcon from "./FavoriteIcon.jsx";
import dateIcon from '/calendar.svg';
import reminderIcon from '/reminder-bell.svg';
import clockIcon from '/clock.svg';
import {options} from "./dateOptions.js";
import ReminderModal from "./ReminderModal.jsx";
import {useRef} from "react";
import {languages} from "./languages.js";

export default function FavoriteTask({favorite, onAddFavorite, handleDeleteFavorite, remove, projectObj, onAddReminder, reminders, languages}) {
    let currentLang = languages.formDate;
    const formatDate = new Date().toLocaleDateString(currentLang, options);

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

    let colorFlag = {date: '', time: ''};
    const currentMs = new Date().getTime();

    const ONE_WEEK_MS = 604800000;

    function timeChecker(item) {
        if (item.time === '—') {
            colorFlag.time = ' text-gray-600';
        }
    }

    return (
        <>
            {favorite.length > 0 && <ul className="rounded-lg">{favorite.map(item => {
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
                return <li className="text-xl rounded-lg bg-stone-300 my-4 p-2 outline-4 outline-none outline-yellow-500 outline-offset-[inherit] animate-ping-once shadow-xl" key={item.id}>
                    <div className="flex justify-between">
                        <span className="break-all mx-0 my-auto">{item.text}</span>
                        <div className="flex"> <button onClick={() => handleDeleteFavorite(item.id)} className=" px-4 py-3 font-medium text-black font-sans hover:text-red-700 transition-colors">{languages.favoriteTaskBtn}</button>
                            <FavoriteIcon remove={() => remove(item.id)} isFavorite={true} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={() => onAddFavorite(item.id)} task={favorite}/></div>
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

                    <ReminderModal languages={languages} reminders={reminders} onAddReminder={onAddReminder} projectObj={projectObj} currentTask={currentTask} ref={dialog} />
                </li>})}</ul>}
        </>
    );
}
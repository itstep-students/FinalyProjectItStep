import deleteIcon from '/delete.svg';
import {options} from "./dateOptions.js";
import {languages} from "./languages.js";
export default function Reminder({reminder, onDeleteReminder, languages}) {
    let currentLang = languages.formDate;
    return (

        <li className="rounded-lg w-full bg-stone-400">
            <div className="flex justify-between px-4 py-2">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis w-full">
                    <p className="text-lg overflow-hidden whitespace-nowrap text-ellipsis w-full"><span className='font-bold'>{languages.reminderTask} </span>{reminder.taskName}</p>
                    <p className="text-lg overflow-hidden whitespace-nowrap text-ellipsis w-full"><span className='font-bold'>{languages.reminderProject} </span>{reminder.projectName}</p>
                    <div className="text-xl font-bold text-center">{new Date(reminder.date).toLocaleDateString(currentLang, options)} {reminder.time}</div>
                </div>
                <button onClick={() => onDeleteReminder(reminder.reminderId)} className="hover:opacity-60 transition-opacity"><img src={deleteIcon} alt="remove"/></button>

            </div>

        </li>
    );
}
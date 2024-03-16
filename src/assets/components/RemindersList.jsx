import remindersIcon from '/reminders.svg';
import emptyReminders from '/empty-reminders.svg';
import Reminder from "./Reminder.jsx";
import {languages} from "./languages.js";
export default function RemindersList({list, open, reminders, onDeleteReminder, languages})  {
    const listOfReminders = <div className="w-80 h-[500px] bg-stone-400 rounded-lg font-sans text-gray-800 px-3 shadow-2xl animate-ping-modal">
        <p className="text-4xl font-medium text-center">{languages.remindersList}</p>
        <div className="w-64 h-1 bg-gray-800 rounded-xl mx-auto my-0 mb-2"></div>
        <ul className="flex overflow-auto py-1 px-1 flex-col gap-2 bg-stone-200 w-full h-5/6 rounded-lg border-4 border-solid border-gray-200">{reminders.map(reminder => <Reminder languages={languages} onDeleteReminder={onDeleteReminder} key={reminder.reminderId} reminder={reminder} />)}</ul>
    </div>;

    return (
        <div className="absolute bottom-20 right-10 flex gap-4 justify-between">
            {list && listOfReminders}
            <button onClick={open} className="self-start"><img src={reminders.length > 0 ? remindersIcon : emptyReminders} alt="reminders"/></button>

        </div>
    );
}
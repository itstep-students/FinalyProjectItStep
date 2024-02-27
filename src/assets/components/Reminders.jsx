import reminders from '/reminders.svg';
import emptyReminders from '/empty-reminders.svg';
export default function Reminders({list, open})  {
    const listOfReminders = <div className="w-80 h-[500px] bg-stone-300 rounded-lg font-sans text-gray-700 px-3">
        <p className="text-4xl font-medium text-center  border-gray-700 border-solid">Reminders</p>
        <div className="w-64 h-1 bg-gray-700 rounded-xl mx-auto my-0 mb-2"></div>
        <div className="bg-stone-200 w-full h-5/6 rounded-lg border-4 border-solid border-gray-200"></div>
    </div>;

    return (
        <div className="absolute top-20 right-10 flex gap-4 justify-between">
            {list && listOfReminders}
            <button onClick={open} className="self-start"><img src={emptyReminders} alt="reminders"/></button>

        </div>
    );
}
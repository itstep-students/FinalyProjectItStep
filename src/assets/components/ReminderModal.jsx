import {forwardRef, useRef, useImperativeHandle} from "react";


const ReminderModal = forwardRef(function ReminderModal({task, projectObj, onAddReminder}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    function handleSaveReminder(e) {
        // e.preventDefault();
        const formData = new FormData(document.querySelector('#form-reminder'));
        const dataObj = {
            date: formData.get('reminder-date'),
            time: formData.get('reminder-time'),
            projectId: projectObj.id,
            taskId: task.id,
            projectName: projectObj.title,
            taskName: task.text,
            reminderId: Math.random()
        }
        onAddReminder(dataObj);
    }
    return (
        <dialog ref={dialog} className="w-[500px] h-[250px] bg-stone-300 rounded-lg text-gray-700 font-sans">
            <div className="flex justify-end">
                <form className="mx-6 mb-0 my-3" method="dialog">
                    <button className="text-3xl hover:opacity-70 transition-opacity">X</button>
                </form>
            </div>
            <div className="text-3xl text-center mb-6 leading-3">Set a reminder</div>
            <form className="flex flex-col gap-5" id="form-reminder">
                <div className="flex bg-stone-300 gap-20 mx-5">
                    <div className="flex rounded-lg bg-stone-200 gap-4 flex-col w-2/4 mx-auto my-0 text-center">
                        <label htmlFor="reminder-date">Pick a date</label>
                        <input className="bg-stone-200 w-36 mx-auto my-0 mb-1" name="reminder-date" type="date"/>
                    </div>
                    <div className="flex rounded-lg gap-4 bg-stone-200 flex-col w-2/4 mx-auto my-0 text-center">
                        <label className="" htmlFor="reminder-time">Pick a time</label>
                        <input className="bg-stone-200 w-22 mx-auto my-0 mb-1" name="reminder-time" type="time"/>
                    </div>
                </div>

                <form method="dialog" className="flex justify-center">
                    <button onClick={handleSaveReminder} className="rounded-lg w-32 mx-auto my-0 opacity-75 px-6 py-3 bg-stone-950 text-xl text-white font-sans hover:opacity-85 transition-opacity">Save</button>
                </form>

            </form>
        </dialog>
    );
});

export default ReminderModal;
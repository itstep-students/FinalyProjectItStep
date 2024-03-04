import {forwardRef, useRef, useImperativeHandle, useEffect, useState} from "react";


const ReminderModal = forwardRef(function ReminderModal({currentTask, projectObj, onAddReminder, reminders}, ref) {
    const dialog = useRef();
    const [styles, setStyles] = useState({date: false, time: false});

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    function handleChange(e, type) {
        if (type === 'date') {
            if (e.target.value.trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, date: true}
                }));
                return;
            }
            setStyles((oldParam => {
                return {...oldParam, date: false}
            }));
        } else if (type === 'time') {
            if (e.target.value.trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, time: true}
                }));
                return;
            }
            setStyles((oldParam => {
                return {...oldParam, time: false}
            }));
        }
    }

    function handleSaveReminder(e) {

        if (reminders.find(reminder => (reminder.projectId === projectObj.id) && (reminder.taskId === currentTask.task.id))) {
            return;
        }
        const formData = new FormData(document.querySelector('#form-reminder'));
        if (formData.get('reminder-date') === '' ||  formData.get('reminder-time') === '') {
            e.preventDefault()
            if (formData.get('reminder-date') === '') {
                setStyles((oldParam) => {
                    return {...oldParam, date: true}
                })

            }
            if (formData.get('reminder-time') === '') {
                setStyles((oldParam) => {
                    return {...oldParam, time: true}
                })

            }
            return;
        }
        const dataObj = {
            date: formData.get('reminder-date'),
            time: formData.get('reminder-time'),
            projectId: projectObj.id,
            taskId: currentTask.task.id,
            projectName: projectObj.title,
            taskName: currentTask.task.text,
            reminderId: Math.random()
        }

        onAddReminder(dataObj);
    }
    return (
        <dialog ref={dialog} className="w-[500px] h-[250px] bg-stone-300 rounded-lg text-gray-700 font-sans shadow-2xl">
            <div className="flex justify-end">
                <form className="mx-6 mb-0 my-3" method="dialog">
                    <button className="text-3xl hover:opacity-70 transition-opacity">X</button>
                </form>
            </div>
            <div className="text-3xl text-center mb-6 leading-3">Set a reminder</div>
            <form className="flex flex-col gap-5" id="form-reminder">
                <div className="flex bg-stone-300 gap-20 mx-5">
                    <div className={`flex rounded-lg bg-stone-200 gap-4 flex-col w-2/4 mx-auto my-0 outline-2 outline-none text-center ${styles.date && 'outline-red-700'}`}>
                        <label htmlFor="reminder-date">Pick a date</label>
                        <input onChange={(e) => handleChange(e, 'date')} id="ddd" className="bg-stone-200 w-36 mx-auto my-0  mb-1" name="reminder-date" type="date"/>
                    </div>
                    <div className={`flex rounded-lg bg-stone-200 gap-4 flex-col w-2/4 mx-auto my-0 text-center outline-2 outline-none ${styles.time && 'outline-red-700'}`}>
                        <label className="" htmlFor="reminder-time">Pick a time</label>
                        <input onChange={(e) => handleChange(e, 'time')} className="bg-stone-200 w-22 mx-auto my-0 mb-1" name="reminder-time" type="time"/>
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
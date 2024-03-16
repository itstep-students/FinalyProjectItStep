import {forwardRef, useRef, useImperativeHandle, useEffect, useState} from "react";



const ReminderModal = forwardRef(function ReminderModal({currentTask, projectObj, onAddReminder, reminders, languages}, ref) {
    const dialog = useRef();
    const formRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const [styles, setStyles] = useState({date: false, time: false});
    const [changeReminder, isChangeReminder] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            change() {
                isChangeReminder(true);
                dateRef.current.value = '';
                timeRef.current.value = '';

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

    function valueChecker(e) {
        if (dateRef.current.value === '' ||  timeRef.current.value === '') {
            e.preventDefault()
            if (dateRef.current.value === '') {
                setStyles((oldParam) => {
                    return {...oldParam, date: true}
                })

            }
            if (timeRef.current.value === '') {
                setStyles((oldParam) => {
                    return {...oldParam, time: true}
                })

            }
        }
    }

    function clearModal() {
        isChangeReminder(false);
        dateRef.current.value = '';
        timeRef.current.value = '';
    }

    function handleSaveReminder(e) {

        const isAlreadySetReminder = reminders.find(reminder => (reminder.projectId === projectObj.id) && (reminder.taskId === currentTask.task.id));

        if (isAlreadySetReminder) {
            if (dateRef.current.value === '' ||  timeRef.current.value === '') {
                valueChecker(e);
                return;
            }
            reminders.map(reminder => {
                if (reminder.taskId === currentTask.task.id) {
                    reminder.date = dateRef.current.value;
                    reminder.time = timeRef.current.value;
                }
                return reminder;
            })
            clearModal();
            onAddReminder('', true);
            return;
        }
        const formData = new FormData(formRef.current);
        if (dateRef.current.value === '' ||  timeRef.current.value === '') {
            valueChecker(e);
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
        clearModal();
        onAddReminder(dataObj);
    }
    return (
        <dialog ref={dialog} className="w-[500px] h-[250px] bg-stone-300 rounded-lg text-gray-700 font-sans shadow-2xl animate-ping-modal">
            <div className="flex justify-end">
                <form className="mx-6 mb-0 my-3" method="dialog">
                    <button onClick={clearModal} className="text-3xl hover:opacity-70 transition-opacity">X</button>
                </form>
            </div>
            <div className="text-3xl text-center mb-6 leading-3">{changeReminder ? languages.reminderModalTitle2 : languages.reminderModalTitle1}</div>
            <form className="flex flex-col gap-5" ref={formRef}>
                <div className="flex bg-stone-300 gap-20 mx-5">
                    <div className={`flex rounded-lg bg-stone-200 gap-4 flex-col w-2/4 mx-auto my-0 outline-2 outline-none text-center ${styles.date && 'outline-red-700'}`}>
                        <label htmlFor="reminder-date">{languages.reminderDate}</label>
                        <input ref={dateRef} onChange={(e) => handleChange(e, 'date')} id="ddd" className="bg-stone-200 w-36 mx-auto my-0  mb-1" name="reminder-date" type="date"/>
                    </div>
                    <div className={`flex rounded-lg bg-stone-200 gap-4 flex-col w-2/4 mx-auto my-0 text-center outline-2 outline-none ${styles.time && 'outline-red-700'}`}>
                        <label htmlFor="reminder-time">{languages.reminderTime}</label>
                        <input ref={timeRef} onChange={(e) => handleChange(e, 'time')} className="bg-stone-200 w-22 mx-auto my-0 mb-1" name="reminder-time" type="time"/>
                    </div>
                </div>

                <form method="dialog" className="flex justify-center">
                    <button onClick={handleSaveReminder} className="rounded-lg w-32 mx-auto my-0 opacity-75 px-6 py-3 bg-stone-800 text-xl text-white font-sans hover:opacity-85 transition-opacity"
                    >{changeReminder ? languages.reminderBtn2 : languages.reminderBtn1}</button>
                </form>

            </form>
        </dialog>
    );
});

export default ReminderModal;
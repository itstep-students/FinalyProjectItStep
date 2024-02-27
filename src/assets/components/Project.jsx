import {useState} from "react";

export default function Project ({addProject, onCancel}) {
    const [styles, setStyles] = useState({title: false, description: false, date: false});

    let descriptionStyles = 'resize-none h-32 font-sans text-lg font-medium border-solid border-b-4 px-3 py-2 outline-none w-full h-10 bg-stone-300 focus:border-stone-600';
    let titleStyles = 'font-sans text-lg font-medium border-solid border-b-4 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600';
    let dateStyles = 'font-sans text-lg font-medium border-solid border-b-4 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600';

    function handleChange(e, type) {
        if (type === 'title') {
            if (e.target.value.trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, title: true}
                }));
                return;
            }
            setStyles((oldParam => {
                return {...oldParam, title: false}
            }));
        } else if (type === 'description') {
            if (e.target.value.trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, description: true}
                }));
                return;
            }
            setStyles((oldParam => {
                return {...oldParam, description: false}
            }));
        } else if (type === 'date') {
            if (e.target.value.trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, date: true}
                }));
                return;
            }
            setStyles((oldParam => {
                return {...oldParam, date: false}
            }));
        }
    }


    function saveData(e) {
        e.preventDefault();

        const formData = new FormData(document.querySelector('#project-form'));

        const dataObj = {
            title: formData.get('title'),
            text: formData.get('text'),
            date: formData.get('date'),
            id: Math.random(),
            tasks: [],
            favoriteTasks: []
        }
        if (formData.get('title').trim() === '' || formData.get('text').trim() === '' || formData.get('date').trim() === '') {
            if (formData.get('title').trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, title: true}
                }));
            }
            if (formData.get('text').trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, description: true}
                }));
            }
            if (formData.get('date').trim() === '') {
                setStyles((oldParam => {
                    return {...oldParam, date: true}
                }));
            }
            return;
        }

    addProject(dataObj);
    }
    return (
             <form id="project-form" onSubmit={saveData} className="flex gap-8 flex-grow flex-col justify-center items-center mb-16">
                 <div className="w-11/12 pl-14 pr-40">
                     <menu className="w-full text-end mb-8 flex justify-end">
                         <li><button onClick={onCancel} className="mr-4 px-4 py-3 text-xl font-medium text-black font-sans hover:text-red-700 transition-colors">Cancel</button></li>
                         <li><button className="rounded-lg opacity-100 px-8 py-3 bg-black text-xl text-white font-sans hover:opacity-80 transition-opacity">Save</button></li>
                     </menu>
                     <div className="mb-6">
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-text">Title</label>
                         <input  onBlur={(e) => handleChange(e, 'title')} name="title" className={styles.title ? titleStyles += ' border-red-700' : titleStyles += ' border-stone-400'} id="input-text" type="text"/>
                     </div>
                     <div className="mb-6">
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="textarea">Description</label>
                         <textarea onBlur={(e) => handleChange(e, 'description')} name="text" className={styles.description ? descriptionStyles += ' border-red-700' : descriptionStyles += ' border-stone-400'} id="textarea"></textarea>
                     </div>
                     <div>
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-date">Due date</label>
                         <input onBlur={(e) => handleChange(e, 'date')} name="date" className={styles.date ? dateStyles += ' border-red-700' : dateStyles += ' border-stone-400'} id="input-date" type="date"/>
                     </div>
                 </div>
             </form>
    );

}


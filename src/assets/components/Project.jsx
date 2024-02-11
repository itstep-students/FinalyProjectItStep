import {useState} from "react";

export default function Project ({addProject, onSave, onCancel}) {
    // const [styles, setStyles] = useState(false);

    let redTitle = 'font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600';
    function saveData(e) {
        e.preventDefault();

        const formData = new FormData(document.querySelector('form'));

        const dataObj = {
            title: formData.get('title'),
            text: formData.get('text'),
            date: formData.get('date'),
            id: Math.random()
        }
        if (formData.get('title').trim() === '' || formData.get('text').trim() === '' || formData.get('date').trim() === '') {
        //     setStyles(true)
        //     redTitle += ' border-solid border-2 border-red';
        //
        //     console.log(redTitle)
            return;
        }
    addProject(dataObj);
    }
    return (
             <form onSubmit={(e) => saveData(e)} className="flex gap-8 flex-grow flex-col justify-center items-center mb-60">
                 <div className="w-11/12 pl-14 pr-40 mt-32">
                     <menu className="w-full text-end mb-8 flex justify-end">
                         <li><button onClick={onCancel} className="opacity-100 mr-4 px-4 py-3 text-xl font-medium text-black font-sans hover:opacity-75 transition-opacity">Cancel</button></li>
                         <li><button onClick={onSave} className="rounded-lg opacity-100 px-8 py-3 bg-black text-xl text-white font-sans hover:opacity-80 transition-opacity">Save</button></li>
                     </menu>
                     <div className="mb-6">
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-text">Title</label>
                         <input required name="title" className={redTitle} id="input-text" type="text"/>
                     </div>
                     <div className="mb-6">
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="textarea">Description</label>
                         <textarea required name="text" className={`resize-none h-32 font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-10 bg-stone-300 focus:border-stone-600`} id="textarea"></textarea>
                     </div>
                     <div>
                         <label className="block mb-2 uppercase font-sans text-xl text-gray-600 font-medium" htmlFor="input-date">Due date</label>
                         <input required name="date" className={` font-sans text-lg font-medium border-solid border-b-4 border-stone-400 px-3 py-2 outline-none w-full h-12 bg-stone-300 focus:border-stone-600`} id="input-date" type="date"/>
                     </div>
                 </div>
             </form>
    );

}


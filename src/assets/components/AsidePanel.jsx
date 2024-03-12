import {languages} from "./languages.js";

export default function AsidePanel({isStart, projects, onSelectSideProject, selectedID})  {

    return (
            <aside className="w-1/4 bg-aside-gradient bg-fixed h-full rounded-tr-2xl text-white font-sans shadow-2xl">
               <h1 className="pt-14 pb-10 pl-8 uppercase text-stone-800 text-3xl font-bold font-sans">{languages[0].asideTitle}</h1>
                <div>
                    <button onClick={isStart} className="rounded-lg mb-4 opacity-70 bg-stone-600 ml-8 px-6 py-3 shadow-2xl text-xl hover:opacity-100 transition-opacity">+ Add Project</button>
                </div>
                <ul className="my-6 ">
                    {projects.projects.map(project => {
                        let classes = "w-full shadow-2xl bg-stone-500 overflow-hidden whitespace-nowrap text-ellipsis mb-2 rounded-lg px-4 py-2 text-left opacity-85 animate-ping-once text-2xl text-white  hover:opacity-100  transition-opacity";

                        if (project.id === selectedID) {
                            classes += ' bg-stone-900'
                        }

                        return(<li className="mx-4" key={project.id}><button onClick={()=>onSelectSideProject(project.id)} className={classes}>{project.title}</button></li>)
                    })
                    }
                </ul>
           </aside>

    )

}


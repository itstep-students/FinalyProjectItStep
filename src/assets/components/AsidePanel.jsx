export default function AsidePanel({isStart, projects, onSelectSideProject, selectedID})  {

    return (
            <aside className="w-1/4 bg-gray-950 h-full rounded-tr-2xl text-white font-sans">
               <h1 className="pt-14 pb-10 pl-8 uppercase font-medium text-3xl font-sans">Your Projects</h1>
                <div>
                    <button onClick={isStart} className="rounded-lg mb-4 opacity-75 bg-stone-700 ml-8 px-6 py-3 text-xl hover:opacity-100 transition-opacity">+ Add Project</button>
                </div>
                <ul className="my-6">
                    {projects.projects.map(item => {
                        let classes = "w-full overflow-hidden whitespace-nowrap text-ellipsis mb-2 rounded-lg px-4 py-2 text-left opacity-75  text-2xl text-white  hover:opacity-100 hover:bg-stone-700 transition-opacity";

                        if (item.id === selectedID) {
                            classes += 'opacity-100 bg-stone-700'
                        }

                        return(<li className="mx-4" key={item.id}><button id={item.id} onClick={onSelectSideProject} className={classes}>{item.title}</button></li>)
                    })
                    }
                </ul>
           </aside>

    )

}


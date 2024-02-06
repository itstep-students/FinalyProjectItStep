export default function AsidePanel() {
    return (
      <aside className="w-96 bg-gray-950 h-full rounded-tr-2xl">
          <h1 className="text-white pt-14 pb-10 pl-8 uppercase font-medium text-3xl font-sans">Your Projects</h1>
          <button className="rounded-lg opacity-75 bg-stone-700 ml-8 text-white px-6 py-3 text-xl font-sans hover:opacity-100 transition-opacity">+ Add Project</button>
          <div></div>
      </aside>
    );
}
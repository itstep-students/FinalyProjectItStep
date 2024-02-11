import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projects, updateProjects] = useState({projects: [], selectedID: undefined});

    function handleStartedProject() {
        setStartedProject(false);
    }

    function handleSelectSideProject(id) {
        updateProjects((oldParam) => {
            let target = oldParam.projects.find((item) => item.title === id.target.innerText);
            return {...oldParam, selectedID: target.id}
        })
    }

    function handleCancelProject(e) {
        e.preventDefault()
        setStartedProject(true);
    }

    function handleDeleteProject() {
        updateProjects((oldParam) => {
            return {
                ...oldParam,
                selectedID: undefined,
                projects: oldParam.projects.filter((item) => item.id !== oldParam.selectedID)
            }
        })
    }

    function handleAddProject(dataObj) {
        updateProjects(oldParam => {
            const newProject = {
                ...dataObj
            }
            oldParam.projects.push(newProject)
            return {...oldParam, selectedID: newProject.id};
        })
        setStartedProject(true);
    }

    const selectedProject = projects.projects.find(item => item.id === projects.selectedID);

  return (
    <>
      <AsidePanel selectedID={selectedProject && selectedProject.id} projects={projects} isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
        {isStartedProject && !selectedProject ? <StartedPage isStart={handleStartedProject}></StartedPage> : selectedProject && isStartedProject ? <SideProject onDelete={handleDeleteProject} project={selectedProject}/> :
        <Project onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>}
    </>
  );
}

export default App;

import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projectsObj, updateProjects] = useState({projects: [], selectedID: undefined});

    function handleStartedProject() {
        setStartedProject(false);
    }

    function handleAddTask(taskText) {
        updateProjects(oldParam => {
            const newTask = {
                text: taskText,
                id: Math.random(),
                projectId: oldParam.selectedID
            }
            const newArrTasks = oldParam.projects.map(item => {
                if (item.id === oldParam.selectedID) {
                    item.tasks = [...item.tasks, newTask]
                    return item;
                }
                return item;
            });
            return {...oldParam,
                projects: newArrTasks
            };
        })
        setStartedProject(true);
    }

    function handleDeleteTask(id) {
        updateProjects((oldParam) => {
            const projectId = [oldParam.projects.find(item => item.id === oldParam.selectedID)][0].id
            oldParam.projects.map(item => {
                if (item.id === projectId) {
                    const newArr = {...oldParam}.projects.find(item => item.id === oldParam.selectedID).tasks.filter(item => item.id !== id)
                    item.tasks = newArr;
                    return item;
                }
                return item;
            });
            return {
                ...oldParam
            }
        })
    }

    function handleSelectSideProject(id) {
        updateProjects((oldParam) => {
            return {...oldParam, selectedID: +id.target.id}
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
            return {...oldParam, selectedID: newProject.id, projects: [...oldParam.projects, newProject]};
        })
        setStartedProject(true);
    }

    const selectedProject = projectsObj.projects.find(item => item.id === projectsObj.selectedID);

  return (
    <>
      <AsidePanel selectedID={selectedProject && selectedProject.id} projects={projectsObj} isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
        {isStartedProject && !selectedProject ? <StartedPage isStart={handleStartedProject}></StartedPage> : selectedProject && isStartedProject ? <SideProject taskList={projectsObj.projects.find(item => item.id === projectsObj.selectedID).tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} project={selectedProject}/> :
        <Project onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>}
    </>
  );
}

export default App;

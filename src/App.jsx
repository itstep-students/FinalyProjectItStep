import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";
import {options} from "./assets/components/dateOptions.js";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projectsObj, updateProjects] = useState({projects: [], selectedID: undefined});

    function handleStartedProject() {
        setStartedProject(false);
    }

    function handleAddTask(task) {
        updateProjects(oldParam => {
            let currentLang = 'en-US';

            const formatDate = new Date(task.date).toLocaleDateString(currentLang, options);
            const newTask = {
                text: task.name,
                id: Math.random(),
                dueDateFormat: `${formatDate === 'Invalid Date' ? '—' : formatDate}`,
                dueDate: task.date,
                time: `${task.time === '' ? '—' : task.time}`,
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

    const selectedProject = projectsObj.projects.find(item => item.id === projectsObj.selectedID);
    function handleAddFavorite(id) {
        const task = selectedProject.tasks.find(item => item.id === id);
        selectedProject.favoriteTasks = [task, ...selectedProject.favoriteTasks]
        console.log(selectedProject.favoriteTasks)

        updateProjects(oldParam => {
            return {...oldParam}
        })
        handleDeleteTask(id)

    }
    function handleDeleteFavorite(id) {
        updateProjects((oldParam) => {
            const projectId = [oldParam.projects.find(item => item.id === oldParam.selectedID)][0].id
            oldParam.projects.map(item => {
                if (item.id === projectId) {
                    const newArr = {...oldParam}.projects.find(item => item.id === oldParam.selectedID).favoriteTasks.filter(item => item.id !== id)
                    item.favoriteTasks = newArr;
                    return item;
                }
                return item;
            });
            return {
                ...oldParam
            }
        })

    }

    function handleRemoveFromFavorite(id) {
        handleDeleteFavorite(id);
        const task = selectedProject.favoriteTasks.find(item => item.id === id);
        selectedProject.tasks = [...selectedProject.tasks, task];
        updateProjects(oldParam => {
            return {...oldParam}
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



  return (
    <>
      <AsidePanel selectedID={selectedProject && selectedProject.id} projects={projectsObj} isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
        {isStartedProject && !selectedProject ? <StartedPage isStart={handleStartedProject}></StartedPage> : selectedProject && isStartedProject ? <SideProject remove={handleRemoveFromFavorite} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={handleAddFavorite} favoriteList={projectsObj.projects.find(item => item.id === projectsObj.selectedID).favoriteTasks} taskList={projectsObj.projects.find(item => item.id === projectsObj.selectedID).tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} project={selectedProject}/> :
        <Project onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>}
    </>
  );
}

export default App;

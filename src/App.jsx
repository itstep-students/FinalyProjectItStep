import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";
import {options} from "./assets/components/dateOptions.js";
import Reminders from "./assets/components/Reminders.jsx";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projectsObj, updateProjects] = useState({projects: JSON.parse(localStorage.getItem('projects')) || [], selectedID: null, reminders: []});
    const [reminders, setReminders] = useState({isOpen: false, remindersList: []});


    function handleOpenReminders() {
        setReminders(oldParam => {
            return {
                ...oldParam,
                isOpen: !oldParam.isOpen
            }
        });
    }
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
            // Old method
            // const updatedProjects = oldParam.projects.map(project => {
            //     if (project.id === oldParam.selectedID) {
            //         project.tasks = [...project.tasks, newTask];
            //     }
            //     return project;
            // });

            // return {...oldParam,
            //     projects: updatedProjects
            // };


            const indexProject = oldParam.projects.findIndex(project=>project.id===oldParam.selectedID);
            oldParam.projects[indexProject].tasks.unshift(newTask);
            localStorage.setItem('projects', JSON.stringify(oldParam.projects))
            return {
                ...oldParam,
            }
        })
        setStartedProject(true);
    }

    function handleDeleteTask(id) {
        updateProjects((oldParam) => {
            const updatedProjects =oldParam.projects.map(project => {
                if (project.id === oldParam.selectedID) {
                    const updatedTasks = project.tasks.filter(task => task.id !== id)
                    project.tasks = updatedTasks;
                }
                return project;
            });
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return {
                ...oldParam,
                projects: updatedProjects
            }
        })
    }

    function handleSelectSideProject(id) {
        updateProjects((oldParam) => {
            return {...oldParam, selectedID: id}
        })
    }

    function handleCancelProject(e) {
        e.preventDefault()
        setStartedProject(true);
    }
    function handleDeleteProject() {
        updateProjects((oldParam) => {
            const updatedProjects = oldParam.projects.filter((item) => item.id !== oldParam.selectedID);
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return {
                ...oldParam,
                selectedID: null,
                projects:  updatedProjects
            }
        })
    }

    const selectedProject = projectsObj.projects.find(item => item.id === projectsObj.selectedID);
    function handleAddFavorite(id) {
        const task = selectedProject.tasks.find(item => item.id === id);
        selectedProject.favoriteTasks = [task, ...selectedProject.favoriteTasks];
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
                    localStorage.setItem('projects', JSON.stringify(item));
                    return item;
                }
                return item;
            });
            return {
                ...oldParam
            }
        })
    }

    function handleAddReminder(reminder) {
        projectsObj.reminders.unshift(reminder);
        updateProjects(oldParam => {
            return {...oldParam}
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
            const updatedProjects = [
                ...oldParam.projects,
                {...dataObj}
            ];
            localStorage.setItem('projects', JSON.stringify(updatedProjects))
            const newProject = {
                ...dataObj
            }
            return {...oldParam, selectedID: newProject.id, projects: updatedProjects};
        })
        setStartedProject(true);
    }



  return (
    <>
      <AsidePanel selectedID={selectedProject && selectedProject.id} projects={projectsObj} isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
        {isStartedProject && !selectedProject ? <StartedPage isStart={handleStartedProject}></StartedPage> : selectedProject && isStartedProject ? <SideProject reminders={projectsObj.reminders} onAddReminder={handleAddReminder} remove={handleRemoveFromFavorite} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={handleAddFavorite} favoriteList={projectsObj.projects.find(item => item.id === projectsObj.selectedID).favoriteTasks} taskList={projectsObj.projects.find(item => item.id === projectsObj.selectedID).tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} project={selectedProject}/> :
        <Project onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>}
        <Reminders list={reminders.isOpen} open={handleOpenReminders} />
    </>
  );
}

export default App;

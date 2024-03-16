import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";
import {options} from "./assets/components/dateOptions.js";
import RemindersList from "./assets/components/RemindersList.jsx";
import {languages} from "./assets/components/languages.js";
import LanguagesSelect from "./assets/components/LanguagesSelect.jsx";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projectsObj, updateProjects] = useState({
        projects: JSON.parse(localStorage.getItem('projects')) || [],
        selectedID: null,
        reminders: JSON.parse(localStorage.getItem('reminders')) || [],
        language: JSON.parse(localStorage.getItem('language')) || 'en'
    });
    const currentLanguage = languages.find(item => item.lang === projectsObj.language);
    const [reminders, setReminders] = useState({isOpen: false, remindersList: []});
    const langArr = [
        {value: 'en', lang: 'English'},
        {value: 'ru', lang: 'Русский'},
    ];

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

            const indexProject = oldParam.projects.findIndex(project => project.id === oldParam.selectedID);
            oldParam.projects[indexProject].tasks.unshift(newTask);
            localStorage.setItem('projects', JSON.stringify(oldParam.projects))
            return {
                ...oldParam,
            }
        })
        setStartedProject(true);
    }

    function handleDeleteTask(id, isFavorite) {

        updateProjects((oldParam) => {
            let updatedReminders;
            const updatedProjects = oldParam.projects.map(project => {
                if (project.id === oldParam.selectedID) {
                    const updatedTasks = project.tasks.filter(task => task.id !== id)
                    project.tasks = updatedTasks;
                }
                return project;
            });
            if (isFavorite) {
                updatedReminders = oldParam.reminders.filter(reminder => reminder.taskId !== id);
            }

            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return {
                ...oldParam,
                ...(updatedReminders ? {reminders: updatedReminders} : {}),
                projects: updatedProjects,
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
            const projects = oldParam.projects.filter((item) => item.id !== oldParam.selectedID);
            const reminders = oldParam.reminders.filter(reminder => reminder.projectId !== oldParam.selectedID);
            localStorage.setItem('projects', JSON.stringify(projects));
            return {
                ...oldParam,
                selectedID: null,
                projects,
                reminders
            }
        })
    }

    const selectedProject = projectsObj.projects.find(item => item.id === projectsObj.selectedID);

    function handleAddFavorite(id) {
        const task = selectedProject.tasks.find(item => item.id === id);
        selectedProject.favoriteTasks = [task, ...selectedProject.favoriteTasks];

        updateProjects(oldParam => {
            localStorage.setItem('projects', JSON.stringify(oldParam.projects));
            return {...oldParam}
        })
        handleDeleteTask(id, true)

    }

    function handleDeleteFavorite(id, isReminder) {

        updateProjects((oldParam) => {
            let updatedReminders;
            const projectId = [oldParam.projects.find(item => item.id === oldParam.selectedID)][0].id;
            const projects = oldParam.projects.map(item => {
                if (item.id === projectId) {
                    const newArr = {...oldParam}.projects.find(item => item.id === oldParam.selectedID).favoriteTasks.filter(item => item.id !== id)
                    item.favoriteTasks = newArr;
                }
                return item;
            });
            if (isReminder) {
                updatedReminders = oldParam.reminders.filter(reminder => reminder.taskId !== id);
            }
            localStorage.setItem('projects', JSON.stringify(oldParam.projects));
            return {
                ...oldParam,
                projects,
                ...(updatedReminders ? {reminders: updatedReminders} : {})
            }
        })
    }

    function handleAddReminder(reminder, isSetReminder) {
        if (!isSetReminder) {
            projectsObj.reminders.unshift(reminder);
        }
        localStorage.setItem('reminders', JSON.stringify(projectsObj.reminders));
        updateProjects(oldParam => {
            return {...oldParam}
        })
    }

    function handleDeleteReminder(id) {
        updateProjects(oldParam => {
            const updatedReminders = oldParam.reminders.filter(reminder => reminder.reminderId !== id);
            localStorage.setItem('reminders', JSON.stringify(updatedReminders));
            return {
                ...oldParam,
                reminders: updatedReminders
            }
        })
    }

    function handleRemoveFromFavorite(id) {
        handleDeleteFavorite(id, true);
        const task = selectedProject.favoriteTasks.find(item => item.id === id);
        selectedProject.tasks = [...selectedProject.tasks, task];
        updateProjects(oldParam => {
            localStorage.setItem('projects', JSON.stringify(oldParam.projects));
            return {...oldParam}
        })
    }

    function handleAddProject(dataObj) {
        updateProjects(oldParam => {
            const updatedProjects = [
                ...oldParam.projects,
                dataObj
            ];
            localStorage.setItem('projects', JSON.stringify(updatedProjects))
            const newProject = {
                ...dataObj
            }
            return {...oldParam, selectedID: newProject.id, projects: updatedProjects};
        })
        setStartedProject(true);
    }

    function selectLanguage(lang) {
        updateProjects((oldParam) => {
            localStorage.setItem('language', JSON.stringify(lang));
            return {...oldParam, language: lang}
        })
    }


    let projectContent;
    if (isStartedProject && !selectedProject) {
        projectContent = <StartedPage languages={currentLanguage} isStart={handleStartedProject}/>;
    } else if (selectedProject && isStartedProject) {
        const currentList = projectsObj.projects.find(item => item.id === projectsObj.selectedID);
        projectContent = <SideProject languages={currentLanguage} reminders={projectsObj.reminders} onAddReminder={handleAddReminder}
                                      remove={handleRemoveFromFavorite} handleDeleteFavorite={handleDeleteFavorite}
                                      onAddFavorite={handleAddFavorite} favoriteList={currentList.favoriteTasks}
                                      taskList={currentList.tasks} onAddTask={handleAddTask}
                                      onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject}
                                      project={selectedProject}/>
    } else {
        projectContent = <Project languages={currentLanguage} onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>
    }
    return (
        <>
            <AsidePanel languages={currentLanguage} selectedID={selectedProject && selectedProject.id} projects={projectsObj}
                        isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
            {projectContent}
            <RemindersList languages={currentLanguage} onDeleteReminder={handleDeleteReminder} reminders={projectsObj.reminders}
                           list={reminders.isOpen} open={handleOpenReminders}/>
            <LanguagesSelect options={langArr} value={projectsObj.language} onChange={selectLanguage} languages={currentLanguage}/>
        </>
    );
}

export default App;

import {useState} from "react";

import AsidePanel from "./assets/components/AsidePanel.jsx";
import Project from "./assets/components/Project.jsx";
import StartedPage from "./assets/components/StartedPage.jsx";
import SideProject from "./assets/components/SideProject.jsx";
import {options} from "./assets/components/dateOptions.js";
import RemindersList from "./assets/components/RemindersList.jsx";

function App() {
    const [isStartedProject, setStartedProject] = useState(true);
    const [projectsObj, updateProjects] = useState({projects: [], selectedID: null, reminders: []});
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
            return {
                ...oldParam,
            }
        })
        setStartedProject(true);
    }

    function handleDeleteTask(id, isFavorite) {
        if (isFavorite) {
            updateProjects((oldParam) => {
                const updatedProjects = oldParam.projects.map(project => {
                    if (project.id === oldParam.selectedID) {
                        const updatedTasks = project.tasks.filter(task => task.id !== id)
                        project.tasks = updatedTasks;
                    }
                    return project;
                });
                return {
                    ...oldParam,
                    projects: updatedProjects,
                }
            })
            return
        }
        updateProjects((oldParam) => {
            const updatedProjects = oldParam.projects.map(project => {
                if (project.id === oldParam.selectedID) {
                    const updatedTasks = project.tasks.filter(task => task.id !== id)
                    project.tasks = updatedTasks;
                }
                return project;
            });

            const updatedReminders = oldParam.reminders.filter(reminder => reminder.taskId !== id);

            return {
                ...oldParam,
                projects: updatedProjects,
                reminders: updatedReminders
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
            return {
                ...oldParam,
                selectedID: null,
                projects: oldParam.projects.filter((item) => item.id !== oldParam.selectedID),
                reminders: oldParam.reminders.filter(reminder => reminder.projectId !== oldParam.selectedID)
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
        handleDeleteTask(id, true)

    }
    function handleDeleteFavorite(id, isReminder) {
        if (isReminder) {
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
            return;
        }
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
            const updatedReminders = oldParam.reminders.filter(reminder => reminder.taskId !== id);
            return {
                ...oldParam,
                reminders: updatedReminders
            }
        })
    }

    function handleAddReminder(reminder, isSetReminder) {
        if (!isSetReminder) {
            projectsObj.reminders.unshift(reminder);
        }

        updateProjects(oldParam => {
            return {...oldParam}
        })
    }

    function handleDeleteReminder(id) {
        updateProjects(oldParam => {
            return {
                ...oldParam,
                reminders: oldParam.reminders.filter(reminder => reminder.reminderId !== id)
            }
        })
    }

    function handleRemoveFromFavorite(id) {
        handleDeleteFavorite(id,true);
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

    let projectContent;

    if(isStartedProject && !selectedProject){
        projectContent= <StartedPage isStart={handleStartedProject} />;
    } else if ( selectedProject && isStartedProject){
        const favoriteTasks = projectsObj.projects.find(item => item.id === projectsObj.selectedID).favoriteTasks;
        const tasksList = projectsObj.projects.find(item => item.id === projectsObj.selectedID).tasks;
        projectContent= <SideProject reminders={projectsObj.reminders} onAddReminder={handleAddReminder} remove={handleRemoveFromFavorite} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={handleAddFavorite} favoriteList={favoriteTasks} taskList={tasksList} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onDelete={handleDeleteProject} project={selectedProject}/>
    } else {
        projectContent= <Project onCancel={(e) => handleCancelProject(e)} addProject={handleAddProject}/>
    }

  return (
    <>

      <AsidePanel selectedID={selectedProject && selectedProject.id} projects={projectsObj} isStart={handleStartedProject} onSelectSideProject={handleSelectSideProject}></AsidePanel>
        {projectContent}
        <RemindersList onDeleteReminder={handleDeleteReminder} reminders={projectsObj.reminders} list={reminders.isOpen} open={handleOpenReminders} />
    </>
  );
}

export default App;

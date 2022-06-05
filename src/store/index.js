import {createStore} from "vuex";
import {localStoragePlugin} from "@/store/plugins/localStorage";
import {ADD_TASK, REMOVE_TASK, SET_ACTIVE_PROJECT, SET_ONLY_PENDING, UPDATE_TASK} from "@/store/mutation-types";
import {MOVE_TASK} from "./action-types"


function getProjectById(state, projectId) {
    return state.projects.find(
        project => project.id === projectId
    )
}

function getProjectAndTaskIndex(state, {projectId, taskId}) {
    const project = getProjectById(state, projectId);
    const taskIndex = project?.tasks?.findIndex(
        (task) => task.id === taskId
    );

    return {
        project,
        taskIndex: taskIndex
    }
}

const store = createStore({
    state() {
        return {
            onlyPending: false,
            activeProjectId: 1,
            projects: [
                {
                    id: 1,
                    name: "First Project",
                    tasks: [
                        {
                            id: 1,
                            description: "Buy food for the dog",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 2,
                            description: "Pay the bills",
                            priority: true,
                            done: false,
                        },
                        {
                            id: 3,
                            description: "Buy some computer games",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 4,
                            description: "Go to the gym",
                            priority: false,
                            done: false,
                        },
                    ],
                },
                {
                    id: 2,
                    name: "Life Project",
                    tasks: [
                        {
                            id: 101,
                            description: "Visit parents",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 102,
                            description: "Visit uncles",
                            priority: true,
                            done: false,
                        },
                        {
                            id: 103,
                            description: "Go around the world",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 104,
                            description: "Quit smoking",
                            priority: false,
                            done: false,
                        },
                    ],
                },
            ],
        };
    },
    getters: {
        activeProject(state) {
            return getProjectById(state, state.activeProjectId);
        },
        projectsWithStats(state) {
            return state.projects.map((project) => ({
                ...project,
                notDoneCount: project.tasks.filter(task => !task.done).length
            }));
        },
        activeProjectTasks(_, getters) {
            return getters.activeProject?.tasks ?? [];
        },
    },
    mutations: {
        [ADD_TASK](state, payload) {
            getProjectById(state, payload.projectId)?.tasks.push(payload.task);
        },
        [REMOVE_TASK](state, payload) {
            const {project, taskIndex} = getProjectAndTaskIndex(state, payload);

            if (taskIndex !== undefined && taskIndex !== -1) {
                project.tasks.splice(taskIndex, 1)
            }
        },
        [UPDATE_TASK](state, payload) {
            const {project, taskIndex} = getProjectAndTaskIndex(state, payload);

            if (taskIndex !== undefined && taskIndex !== -1) {
                project.tasks[taskIndex] = payload.task;
            }
        },
        [SET_ONLY_PENDING](state, payload) {
            state.onlyPending = payload;
        },
        [SET_ACTIVE_PROJECT](state, projectId) {
            state.activeProjectId = projectId;
        }
    },
    actions: {
        [MOVE_TASK]({commit, state}, {taskId, fromProjectId, toProjectId}) {
            const {project, taskIndex} = getProjectAndTaskIndex(state, {taskId, projectId: fromProjectId});
            commit(ADD_TASK, {
                task: project.tasks[taskIndex],
                projectId: toProjectId
            });
            commit(REMOVE_TASK, {
                taskId,
                projectId: fromProjectId
            });
        }
    },
    plugins: [localStoragePlugin]
});

export default store;
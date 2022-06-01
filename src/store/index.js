import {createStore} from "vuex";
import { localStoragePlugin} from "@/store/plugins/localStorage";
import {ADD_TASK, SET_ACTIVE_PROJECT, SET_ONLY_PENDING, UPDATE_TASK} from "@/store/mutation-types";

function getProjectById(state, projectId){
    return state.projects.find(
        project => project.id === projectId
    )
}

const store = createStore({
    state() {
        return {
            onlyPending: false,
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
                            id: 1,
                            description: "Visit parents",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 2,
                            description: "Visit uncles",
                            priority: true,
                            done: false,
                        },
                        {
                            id: 3,
                            description: "Go around the world",
                            priority: false,
                            done: false,
                        },
                        {
                            id: 4,
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
        projectsWithStats(state){
            return state.projects.map((project) => ({
                ...project,
                notDoneCount: project.tasks.filter(task => !task.done).length
            }));
        }
    },
    mutations: {
        [ADD_TASK](state, payload) {
            getProjectById(state, payload.projectId)?.tasks.push(payload.task);
        },
        [UPDATE_TASK](state, payload) {
            const project = getProjectById(state, payload.projectId);
            const taskIndex = project?.tasks?.findIndex(
                (task) => task.id === payload.id
            );

            if (taskIndex !== undefined && taskIndex !== -1) {
                project.tasks[taskIndex] = payload.task;
            }
        },
        [SET_ONLY_PENDING](state, payload) {
            state.onlyPending = payload;
        },
        [SET_ACTIVE_PROJECT](state, projectId){
            state.activeProjectId = projectId;
        }
    },
    plugins: [localStoragePlugin]
});

export default store;
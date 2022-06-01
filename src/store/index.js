import {createStore} from "vuex";
import { localStoragePlugin} from "@/store/plugins/localStorage";

function getProjectById(state, id){
    return state.projects.find(
        project => project.id === id
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
        addTask(state, payload) {
            getProjectById(state, payload.projectId)?.tasks.push(payload.task);
        },
        updateTask(state, payload) {
            const project = getProjectById(state, payload.projectId);
            const taskIndex = project?.tasks?.findIndex(
                (task) => task.id === payload.id
            );

            if (taskIndex !== undefined && taskIndex !== -1) {
                project.tasks[taskIndex] = payload.task;
            }
        },
        setOnlyPending(state, payload) {
            state.onlyPending = payload;
        },
        setActiveProject(state, activeProjectId){
            state.activeProjectId = activeProjectId;
        }
    },
    plugins: [localStoragePlugin]
});

export default store;
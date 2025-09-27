import type { todoDataType } from "./types/todoDataTypes"

const todoData : todoDataType[] = [
    {
        id: "1",
        task: "Create A To Do List",
        category: "work",
        subtasks: null,
        completed: true,
    },
    {
        id: "2",
        task: "Start A To Do List",
        category: "study",
        subtasks: [
            {
                subId: "2o1",
                subtask: "Drink Water",
                completed: false
            },
            {
                subId: "2o2",
                subtask: "Read a lot",
                completed: true
            }
        ],
        completed: false,
    },
    {
        id: "3",
        task: "Complete A To Do List",
        category: "health",
        subtasks: null,
        completed: false,
    }
]

export default todoData
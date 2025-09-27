export interface subtaskType {
    subId: string,
    subtask: string,
    completed: boolean
}
export interface todoDataType {
    id: string,
    task: string,
    category: "work" | "study" | "health" | "others"
    subtasks: subtaskType[] | null
    completed: boolean,
}

export interface groupItems {
    "health": number,
    "study": number,
    "work": number,
    "others": number
}


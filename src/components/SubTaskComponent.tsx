import type { subtaskType, todoDataType } from "../appData/types/todoDataTypes"

interface SubTaskComponentProps{
    subTask: subtaskType,
    todo: todoDataType,
    todos: todoDataType[],
    setTodos: React.Dispatch<React.SetStateAction<todoDataType[]>>,
}

export default function SubTaskComponent({subTask, todo, todos, setTodos}: SubTaskComponentProps){

    function updateTodo() : void{
        const newSubtask : subtaskType = { ...subTask, completed: !subTask.completed }
        
        const todoId : string = todo.id
        const subTaskId: string = subTask.subId
        const todoIndex : number = todos.findIndex(todoi => todoi.id == todoId)

        const newTodo : todoDataType = todos[todoIndex]

        const subTaskIndex: number = newTodo.subtasks?.findIndex(subTaski => subTaski.subId == subTaskId)

        newTodo.subtasks[subTaskIndex] = newSubtask 

        const newTodoArray: todoDataType[] = [...todos]
        newTodoArray.splice(todoIndex, 1, newTodo)
        
        setTodos(newTodoArray)
    }

    return(
        <>
            <div></div>
            <label htmlFor={subTask.subId} className="flex align-center gap-4">
                <input type="checkbox" className="appearance-none w-6 h-6 border-2 border-[D6D6D6] rounded-md bg-checked bg-cover bg-center bg-no-repeat checked:border-0" name={subTask.subId} id={subTask.subId} checked={subTask.completed} onChange={updateTodo}/>
                <span className={`font-medium text-[17px] text-[121212] mb-2 text-[${subTask.completed && "#666666"}]`}>{subTask.subtask}</span>
            </label>
        </>
    )
}

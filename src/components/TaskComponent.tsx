import type { subtaskType, todoDataType } from "../appData/types/todoDataTypes"
import SubTaskComponent from "./SubTaskComponent"

import deleteIcon from "../assets/delete.svg"

interface TaskComponentProps {
    todo: todoDataType,
    setTodos: React.Dispatch<React.SetStateAction<todoDataType[]>>,
    todos: todoDataType[]
}

export default function TaskComponent({todo, todos, setTodos} : TaskComponentProps){
    const subtasks = todo.subtasks
    const subtasksElements = subtasks?.map((subtask: subtaskType) => (<SubTaskComponent subTask={subtask} todo ={todo} todos={todos} setTodos={setTodos} />))

    const themeColor: string = todo.completed ? "#666666" : todo.category.toLowerCase() == "health" ? "#7990F8" : todo.category.toLowerCase() == "study" ? "#46CF8B" : todo.category.toLowerCase() == "work" ? "#BC5EAD" : "#908986"

    function updateTodo() : void{
      console.log("happyy")
      const newTodo = { ...todo, completed: !todo.completed }
      const id = todo.id
      const todoIndex = todos.findIndex(todoi => todoi.id == id)

      const newTodoArray: todoDataType[] = [...todos]
      newTodoArray.splice(todoIndex, 1, newTodo)

      setTodos(newTodoArray)
    }

    const deleteTask = () =>{
      const taskId : string = todo.id
      const newTodos = todos.filter(holderTodos => holderTodos.id !== taskId)

      setTodos(newTodos)
    }

    return(
      <div className="grid grid-cols-[20px_1fr] gap-4 place-content-start px-4 py-5 border-b-1 border-b-black/15">
        <input type="checkbox" className={`appearance-none w-6 h-6 bg-cover bg-center bg-no-repeat border-2 border-[D6D6D6] rounded-md bg-checked checked:border-0 cursor-pointer`} name={todo.id} id={todo.id} checked={todo.completed} onChange={updateTodo}/>
        <label htmlFor={todo.id}>
          <span className={`flex justify-between items-center w-full font-medium text-[17px] text-[121212] mb-2 text-[${todo.completed && "#666666"}]`}>{todo.task} <button onClick={deleteTask} className="cursor-pointer" ><img src={deleteIcon} alt="Delete Icon" className="w-8"/></button></span>
          <div className="flex place-items-start">
            <span className={`font-semibold text-[17px] text-[#${themeColor}] tracking-tight bg-[${themeColor}]/10 px-1.5 py-1 mr-2 rounded-sm `}>{todo.category.toUpperCase()}</span>     
          </div>
        </label>
        {subtasks && subtasksElements}
      </div>
    )
}
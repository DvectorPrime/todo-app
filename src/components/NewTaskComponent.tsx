import { useEffect, useRef, useState } from "react"
import closeIcon from "../assets/x-close.svg"
import type { todoDataType } from "../appData/types/todoDataTypes"


interface NewSubTaskProps {
    newTask: todoDataType,
    subTaskIndex: number,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function NewSubTask({newTask, subTaskIndex, handleChange} : NewSubTaskProps){
    return (
        <aside className="pl-7 grid grid-cols-[20px_1fr] gap-4.5 align-middle">
            <span className="inline-block w-6 h-6 border-2 border-[#D6D6D6] rounded-sm"></span>
            <input type="text" name="subtask" id={`${newTask.id}-${Date.now()}-subTask`} placeholder="Add Subtask" className="focus:outline-none" onChange={handleChange} value={newTask.subtasks?.[subTaskIndex]?.subtask ?? ""}/>
        </aside>
    )
}

export default function AddNewTask(){
    const [newTaskData, setNewTaskData] = useState<todoDataType>({
        id: `${Date.now()}vptask`,
            task: "",
            category: "others",
            subtasks: [
                {
                    subId: "",
                    subtask: "",
                    completed: false
                }
            ],
            completed: false,
            timeDue: null
        })
        
    const [allSubtaskFilled, setAllSubtaskFilled] = useState<boolean>(true)

    useEffect(() => {
        if (newTaskData.subtasks) {
            for (let i = 0; i < newTaskData.subtasks.length; i++) {
                if (newTaskData.subtasks[i].subtask === "") {
                    setAllSubtaskFilled(false)
                }
            }
        }
          if (allSubtaskFilled && newTaskData && newTaskData.subtasks){
            newTaskData.subtasks.push({
            subId: "",
            subtask: "",
            completed: false
            })
        }
    }, [newTaskData])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value, tagName, id } = e.target;
        setNewTaskData(prev => {
            if (tagName === 'TEXTAREA') {
                return {
                    ...prev,
                    task: value
                };
            } else if (name === "category") {
                return {
                    ...prev,
                    category: id.toLowerCase() as todoDataType["category"]
                };
            } else if (name == "subtask"){
                const holderSubTasksData = newTaskData.subtasks

                if (holderSubTasksData?.length === 1) {
                    holderSubTasksData[0].subId = id
                    holderSubTasksData[0].subtask = value
                }

                return {
                    ...prev,
                    subtasks: holderSubTasksData
                }
            } else {
                return prev;
            }
        });
    }
        
    const newSubTaskElements = newTaskData.subtasks
        ? newTaskData.subtasks.map((data, index) => <NewSubTask newTask={newTaskData} subTaskIndex={index} handleChange={handleChange} />)
        : <NewSubTask newTask={newTaskData} subTaskIndex={0} handleChange={handleChange} />;

    console.log(newTaskData)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInput = () => {
        const textAreaContent = textareaRef.current

        if (textAreaContent && textAreaContent.scrollHeight < window.innerHeight - 500){
            textAreaContent.style.height = "auto";
            textAreaContent.style.height = `${textAreaContent.scrollHeight}px`
        }
    }

    
    return(
        <section className="relative h-[100vh] p-8">
            <button type="button" className="absolute right-7 top-5"><img src={closeIcon} alt="close" /></button>
            <textarea
                ref = {textareaRef}
                onInput={handleInput} 
                name="" 
                id="" 
                placeholder="Write a New Task..."
                className="mb-2 resize-none overflow-hidden mt-15 w-full h-fit font-medium text-4xl tracking-tight placeholder-black/50 placeholder-opacity-50 focus:outline-none"
                rows={1}
                onChange={handleChange}
            ></textarea>
            {newSubTaskElements}
            <div className="absolute bottom-5 left-8 right-8">
                <div className="">
                    <label htmlFor="health" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-2.5 rounded-md text-[#666666]/50 font-semibold text-sm"><input type="radio" className="appearance-none" name="category" id="health" onChange={handleChange}/>Health</label>
                    <label htmlFor="health" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-2.5 rounded-md text-[#666666]/50 font-semibold text-sm"><input type="radio" className="appearance-none" name="category" id="study" onChange={handleChange}/>Study</label>
                    <label htmlFor="health" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-2.5 rounded-md text-[#666666]/50 font-semibold text-sm"><input type="radio" className="appearance-none" name="category" id="Work" onChange={handleChange}/>Work</label>
                </div>
                <button type="button" className="w-full p-2.5 bg-[#393433] text-white text-lg font-medium rounded-xl">Save</button>
            </div>
        </section>
    )
}
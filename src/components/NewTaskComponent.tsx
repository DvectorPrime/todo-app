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
            <input type="text" name="subtask" id={newTask.subtasks?.[subTaskIndex]?.subId ?? ""} placeholder="Add Subtask" className="focus:outline-none" onChange={handleChange} value={newTask.subtasks?.[subTaskIndex]?.subtask ?? ""}/>
        </aside>
    )
}

interface AddNewTaskProps{
    setTodos: React.Dispatch<React.SetStateAction<todoDataType[]>>
}

export default function AddNewTask({setTodos} : AddNewTaskProps){
    const initialId = `${Date.now()}vptask`;
    const [newTaskData, setNewTaskData] = useState<todoDataType>({
        id: initialId,
        task: "",
        category: "others",
        subtasks: [],
        completed: false,
        timeDue: null
    })

    const ranOnce = useRef(false)

    useEffect(() => {
        if (ranOnce.current){return} 
        
        ranOnce.current = true

        if (!newTaskData.subtasks) {
            // if no subtasks yet, start with one blank
            setNewTaskData(prev => ({
            ...prev,
            subtasks: [
                {
                subId: `${initialId}-${Date.now()}-subTask`,
                subtask: "",
                completed: false,
                },
            ],
            }));
            return;
        }

        // Check if all existing subtasks are filled
        const allFilled = newTaskData.subtasks.every(st => st.subtask.trim() !== "");

        if (allFilled) {
            const last = newTaskData.subtasks[newTaskData.subtasks.length - 1];

            if (!last || last.subtask.trim() !== "") {
            // Only append if the last subtask isn’t already blank
            setNewTaskData(prev => ({
                ...prev,
                subtasks: [
                ...(prev.subtasks ?? []),
                {
                    subId: `${initialId}-${Date.now()}-subTask`,
                    subtask: "",
                    completed: false,
                },
                ],
            }));
            }
        }
        }, [newTaskData, initialId]);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        ranOnce.current = false
        const { name, value, tagName, id } = e.target;
        setNewTaskData(prev => {
            if (tagName === 'TEXTAREA') {
                return {
                    ...prev,
                    task: value
                };
            } else if (name === "category") {
                console.log("if this owrks")
                return {
                    ...prev,
                    category: id.toLowerCase() as todoDataType["category"]
                };
            } else if (name == "subtask"){
                const holderSubTasksData = newTaskData.subtasks

                const subTaskIndex = holderSubTasksData?.findIndex(subtask => subtask.subId === id);

                if (subTaskIndex !== undefined && subTaskIndex !== -1 && holderSubTasksData) {
                    const updatedSubtasks = holderSubTasksData.map((subtask, idx) =>
                        idx === subTaskIndex ? { ...subtask, subtask: value } : subtask
                    );
                    return {
                        ...prev,
                        subtasks: updatedSubtasks
                    };
                }

                console.log(subTaskIndex);

                return prev;
            } else {
                return prev;
            }
        });
    }
        
    const newSubTaskElements = newTaskData.subtasks
        ? newTaskData.subtasks.map((_data, index) => <NewSubTask newTask={newTaskData} subTaskIndex={index} handleChange={handleChange} />)
        : <NewSubTask newTask={newTaskData} subTaskIndex={0} handleChange={handleChange} />;

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInput = () => {
        const textAreaContent = textareaRef.current

        if (textAreaContent && textAreaContent.scrollHeight < window.innerHeight - 500){
            textAreaContent.style.height = "auto";
            textAreaContent.style.height = `${textAreaContent.scrollHeight}px`
        }
    }

    const addCompletedNewTask = () => {
        const filteredSubtasks = newTaskData.subtasks?.filter(
            (subtask) => subtask.subtask.trim() !== ""
        ) || [];

        const updatedTask = {
            ...newTaskData,
            subtasks: filteredSubtasks,
        };

        setNewTaskData(updatedTask);
        setTodos((prev) => [updatedTask, ...prev]);

        console.log(updatedTask);
    };

    
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
                    <label htmlFor="health" className={`bg-[${newTaskData.category === "health" ? "#7990F8" : "#E0E0E0"}] px-1 py-0.5 m-2.5 rounded-md text-[${newTaskData.category === "health" ? "#7990F8" : "#666666"}]/50 font-semibold text-sm`}><input type="radio" className="appearance-none" name="category" id="health" onChange={handleChange} value="health" checked={newTaskData.category === "health"} />Health</label>
                    <label htmlFor="study" className={`bg-[${newTaskData.category === "study" ? "#7990F8" : "#E0E0E0"}] px-1 py-0.5 m-2.5 rounded-md text-[${newTaskData.category === "study" ? "#7990F8" : "#666666"}]/50 font-semibold text-sm`}><input type="radio" className="appearance-none" name="category" id="study" onChange={handleChange} value="study" checked={newTaskData.category === "study"} />Study</label>
                    <label htmlFor="work" className={`bg-[${newTaskData.category === "work" ? "#7990F8" : "#E0E0E0"}] px-1 py-0.5 m-2.5 rounded-md text-[${newTaskData.category === "work" ? "bg-amber-400" : "#666666"}]/50 font-semibold text-sm`}><input type="radio" className="appearance-none" name="category" id="work" onChange={handleChange} value="work" checked={newTaskData.category === "work"} />Work</label>
                </div>
                <button type="button" className="w-full p-2.5 bg-[#393433] text-white text-lg font-medium rounded-xl" onClick={addCompletedNewTask}>Save</button>
            </div>
        </section>
    )
}
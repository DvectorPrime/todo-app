import { useRef } from "react"
import closeIcon from "../assets/x-close.svg"

function NewSubTask(){
    return (
        <aside className="pl-7 grid grid-cols-[20px_1fr] gap-4.5 align-middle">
            <span className="inline-block w-6 h-6 border-2 border-[#D6D6D6] rounded-sm"></span>
            <input type="text" name="" id="" placeholder="Add Subtask" className="focus:outline-none"/>
        </aside>
    )
}

export default function AddNewTask(){
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
            ></textarea>
            <NewSubTask />
            <div className="absolute bottom-5 left-8 right-8">
                <div className="">
                    <button type="button" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-1.5 rounded-md text-[#666666]/50 font-semibold text-sm">Health</button>
                    <button type="button" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-1.5 rounded-md text-[#666666]/50 font-semibold text-sm">Study</button>
                    <button type="button" className="bg-[#E0E0E0]/40 px-1 py-0.5 m-1.5 rounded-md text-[#666666]/50 font-semibold text-sm">Work</button>
                </div>
                <button type="button" className="w-full p-2.5 bg-[#393433] text-white text-lg font-medium rounded-xl">Save</button>
            </div>
        </section>
    )
}
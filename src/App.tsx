import { useEffect, useState } from "react"

import todoData from "./appData/todoData"
import healthIcon from "./assets/health.svg"
import studyIcon from "./assets/study.svg"
import workIcon from "./assets/work.svg"
import othersIcon from "./assets/others.svg"
import addTask from "./assets/Add task.svg"

import TaskComponent from "./components/TaskComponent"
import AddNewTask from "./components/NewTaskComponent"

import type { groupItems, todoDataType } from "./appData/types/todoDataTypes"



function App() {
  const todosStrings : string | null = localStorage.getItem("vptodos")

  const [todos, setTodos] = useState<todoDataType[]>(todosStrings ? JSON.parse(todosStrings) : todoData)

  const [groupItemsCount, setGroupItemsCount] =  useState<groupItems>({
    "health": 0,
    "study": 0,
    "work": 0,
    "others": 0
  })

  const [newTaskpageOpen, setNewTaskpageOpen] = useState<boolean>(false)

  useEffect(() => {
    const counts: groupItems = {
      "health": 0,
      "study": 0,
      "work": 0,
      "others": 0
    };

    for (let i = 0; i < todos.length; i++) {
      const category = todos[i].category as keyof groupItems;
      counts[category] = (counts[category] || 0) + 1;
    }
    setGroupItemsCount(counts);
  }, [todos])

  useEffect(() => {
    localStorage.setItem("vptodos", JSON.stringify(todos))
  }, [todos])

  const [displayedTodos, setDisplayedTodos] = useState<todoDataType[]>(todos)

  useEffect(() => {
    const holderTodos = todos.sort((a, b) => Number(a.completed) - Number(b.completed))

    setDisplayedTodos(holderTodos)
  }, [todos])

  const todoElements = displayedTodos.map(todo => <TaskComponent todo={todo} todos={todos} setTodos={setTodos} />)

  const openNewTaskPage = () => {
    setNewTaskpageOpen(true)
  }
  
  return (
    <>
      {newTaskpageOpen && <AddNewTask setTodos={setTodos} setNewTaskpageOpen={setNewTaskpageOpen} />}
      {
        !newTaskpageOpen &&
        <main className='p-8'>
          <h2 className="sticky top-0 z-50 bg-white text-4xl tracking-tight pb-6.5"><span className="font-bold">Today </span><span className="font-medium opacity-20">26 Dec</span> </h2>
          <section className='w-full my-4 grid grid-cols-2 gap-3 items-center'> 
            <div className="w-full p-3 rounded-xl bg-[#7990F8]/10">
              <img className="mb-4 w-6" src={healthIcon}/>
              <p className="text-[17px] text-[#121212]"><span className="font-bold">{groupItemsCount.health} </span><span className="font-medium opacity-50">Health</span></p>
            </div>
             <div className="w-full p-3 rounded-xl bg-[#46CF8B]/10">
              <img className="mb-4 w-6" src={studyIcon}/>
              <p className="text-[17px] text-[#121212]"><span className="font-bold">{groupItemsCount.study} </span><span className="font-medium opacity-50">Study</span></p>
            </div>
             <div className="w-full p-3 rounded-xl bg-[#BC5EAD]/10">
              <img className="mb-4 w-6" src={workIcon} />
              <p className="text-[17px] text-[#121212]"><span className="font-bold">{groupItemsCount.work} </span><span className="font-medium opacity-50">Work</span></p>
            </div>
             <div className="w-full p-3 rounded-xl bg-[#908986]/10">
              <img className="mb-4 w-6" src={othersIcon} />
              <p className="text-[17px] text-[#121212]"><span className="font-bold">{groupItemsCount.others} </span><span className="font-medium opacity-50">Others</span></p>
            </div>
          </section>
          <section>
            {todoElements}
          </section>
          <button className="fixed right-6 bottom-6 px-[21px] py[14px] w-[60px] h-[60px] bg-[#393433] rounded-xl" onClick={openNewTaskPage}>
            <img src={addTask} alt="Add task" />
          </button>
        </main>
      }
    </>
  )
}

export default App

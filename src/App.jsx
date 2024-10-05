import { useState, useRef} from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  const inputRef = useRef(null)
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item)=>{
      return item.id!==id
    })
    setTodos(newTodos)
    inputRef.current.focus();
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
  }
  const handleAdd = ()=>{
    setTodos([...todos,{ id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index  = todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  const toggleFinished = ()=>{
    setShowFinished(!showFinished)
  }
  return ( 
    <>
      <div className="container mx-auto my-5 rounded-xl bg-violet-100 min-h-[80vh] p-5 w-1/2">
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add Todo</h2>
          <input placeholder="  Add your tasks" ref ={inputRef} onChange={handleChange} type="text" value={todo} className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd}  disabled={todo.length<3} className='bg-blue-600 hover:bg-blue-900 rounded-md p-2 py-1 text-sm font-bold text-white'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Completed Tasks
        <div className='h-[1px] bg-black opacity-15 w-3/4 mx-auto my-4'></div>
        <h2 className='text-lg font-bold mx-1 py-1'>Your Todos</h2>
        <div className="todos">
          {todos.length==0 && <div className='m-5'>No todos to display </div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) &&
            <div key={item.id}className="todo flex w-1/2 my-3 justify-between gap-2">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-black p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-black p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin6Fill /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}
export default App
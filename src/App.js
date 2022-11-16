import React, { useState, useRef, useEffect} from "react"
import ToDoList from "./ToDoList"
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(() => {
    console.log(localStorage)
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])

  useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  console.log(todos)

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return    
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  console.log(localStorage)

  return (
    <>
    <ToDoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos} >Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length}: left to do!</div>
    </>
  )
}

export default App

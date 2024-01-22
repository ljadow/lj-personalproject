import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import Tasks from './components/tasks'
import Groups from './components/groups'
import Users from './components/users'
import SingleTask from './components/singletask'
import UserTasks from './components/userTasks'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/groups' element={<Groups/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/tasks/:id' element={<SingleTask />} />
      <Route path='/tasks/user/:id' element={<UserTasks />} />
    </Routes>
    </>
  )
}

export default App

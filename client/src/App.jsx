import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import Tasks from './components/tasks'
import Groups from './components/groups'
import Users from './components/users'
import Login from './components/login'
import Admin from './components/admin'
import SingleTask from './components/singletask'
import UserTasks from './components/userTasks'
import EditUser from './components/edituser'
import EditGroup from './components/editgroup'
import { BiListCheck } from 'react-icons/bi'
import './App.css'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><BiListCheck /> My Tasks</h1>
      <Navigation setToken={setToken} />
      <Routes>
        <Route path='/' element={<Tasks />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/admin' element={<Admin token={token} setToken={setToken} />} />
        <Route path='/groups/:id' element={<EditGroup />} />
        <Route path='/users/:id' element={<EditUser />} />
        <Route path='/tasks/:id' element={<SingleTask />} />
        <Route path='/tasks/user/:id' element={<UserTasks />} />
      </Routes>
    </>
  )
}

export default App

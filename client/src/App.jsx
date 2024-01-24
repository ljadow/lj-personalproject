import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/homepage'
import Navigation from './components/navigation'
import Tasks from './components/tasks'
import Groups from './components/groups'
import Users from './components/users'
import Login from './components/login'
import SingleTask from './components/singletask'
import UserTasks from './components/userTasks'
import EditUser from './components/edituser'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  
  return (
    <>

      {token && <><h1>My Tasks</h1> <Navigation setToken={setToken} /></>}
      <Routes> 
        <Route path='/' element={<Homepage />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/users/:id' element={<EditUser />} />
        <Route path='/tasks/:id' element={<SingleTask />} />
        <Route path='/tasks/user/:id' element={<UserTasks />} />
      </Routes>
    </>
  )
}

export default App

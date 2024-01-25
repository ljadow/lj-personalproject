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
import EditGroup from './components/editgroup'
import { BiListCheck } from 'react-icons/bi'
import './App.css'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <h1><BiListCheck/> My Tasks</h1>
      <Navigation setToken={setToken} />
      {/* {token && <><h1>My Tasks</h1><Navigation setToken={setToken} /></>} */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/tasks' element={<Tasks token={token} />} />
        <Route path='/groups' element={<Groups token={token} />} />
        <Route path='/users' element={<Users token={token} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/groups/:id' element={<EditGroup token={token} />} />
        <Route path='/users/:id' element={<EditUser token={token} />} />
        <Route path='/tasks/:id' element={<SingleTask token={token} />} />
        <Route path='/tasks/user/:id' element={<UserTasks token={token} />} />
      </Routes>
    </>
  )
}

export default App

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar';
import About from '../pages/About/About';
import AddApprovers from '../pages/CreateWorkflow/AddApprovers';
import AddPermission from '../pages/CreateWorkflow/AddPermission';
import CreateForm from '../pages/CreateWorkflow/CreateForm'
import CreateProcess from '../pages/CreateWorkflow/CreateProcess';
import Workflows from '../pages/CreateWorkflow/Index'
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import Sidebar from '../components/Sidebar';
import Getuser from '../components/User/Retreive/Getuser';
import Adduser from '../components/User/AddUser/Adduser';
import SelectStep from '../pages/CreateWorkflow/SelectStep';
import Login from '../pages/Login/Login';
const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <div className='w-full'>
              <Element/>
            </div>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<Home/>}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
            <Route exact path={ROUTES.Workflows} element={<RouteWithRole Element={Workflows} />}></Route>
            <Route exact path={ROUTES.CreateForm} element={<RouteWithRole Element={CreateForm} />}></Route>
            <Route exact path={ROUTES.AddApprovers} element={<RouteWithRole Element={AddApprovers} />}></Route>
            <Route exact path={ROUTES.AddPermission} element={<RouteWithRole Element={AddPermission} />}></Route>
            <Route exact path={ROUTES.SelectStep} element={<RouteWithRole Element={SelectStep} />}></Route>
            <Route exact path={ROUTES.CreateProcess} element={<RouteWithRole Element={CreateProcess} />}></Route>
            <Route exact path={ROUTES.Login} element={<Login />}></Route>
            <Route exact path={ROUTES.addUser} element={<Adduser />}></Route>
            <Route exact path={ROUTES.getUser} element={<Getuser />}></Route>
        </Routes>
    </div>
  )
}

export default Router
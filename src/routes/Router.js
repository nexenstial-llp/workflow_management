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

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
          {/* <Navbar/> */}
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
            <Route exact path={ROUTES.Workflows} element={<RouteWithRole Element={Workflows} />}></Route>
            <Route exact path={ROUTES.CreateForm} element={<RouteWithRole Element={CreateForm} />}></Route>
            <Route exact path={ROUTES.AddApprovers} element={<RouteWithRole Element={AddApprovers} />}></Route>
            <Route exact path={ROUTES.AddPermission} element={<RouteWithRole Element={AddPermission} />}></Route>
            <Route exact path={ROUTES.CreateProcess} element={<RouteWithRole Element={CreateProcess} />}></Route>

        </Routes>
    </div>
  )
}

export default Router
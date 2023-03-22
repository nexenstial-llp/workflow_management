import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About/About';
import CreateForm from '../pages/Form/CreateForm';
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
            <Route exact path={ROUTES.CreateForm} element={<RouteWithRole Element={CreateForm} />}></Route>
        </Routes>
    </div>
  )
}

export default Router
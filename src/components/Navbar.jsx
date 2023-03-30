import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/RouterConfig'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <header className="text-gray-600 body-font shadow-card">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className='mr-4 text-xl font-bold text-nex'>
                    Nexenstial
                </div>
                <nav className=" flex flex-wrap items-center text-base justify-self-start">
                    <button onClick={()=>{navigate(ROUTES.Workflows)}} className="mr-5 hover:text-gray-900">Apps</button>
                </nav>
            </div>
        </header>

    )
}

export default Navbar
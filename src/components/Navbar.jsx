import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/RouterConfig'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <header className="text-gray-600 body-font shadow-card">
            <div className="container mx-auto flex flex-wrap p-[10px] flex-col md:flex-row items-center">
                
               
                    <button onClick={()=>{navigate(ROUTES.Login)}} className="ml-auto hover:text-gray-900"><i className="bi bi-box-arrow-left font-semibold text-[22px]"></i></button>
                
            </div>
        </header>

    )
}

export default Navbar
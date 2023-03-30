import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const Index = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='container m-auto sm:p-5 p-3'>
            <div className="grid sm:grid-cols-5 gap-3">
                <div onClick={()=>{navigate(ROUTES.CreateForm)}} className="col-span-1 card shadow-card p-2 aspect-square flex items-center justify-center text-2xl font-bold cursor-pointer">
                    Create App
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index
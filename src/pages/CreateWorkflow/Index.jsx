import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const Index = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='container m-auto sm:p-5 p-3'>
            <div className="row">
            <div className="col-md-2">
                <div onClick={()=>{navigate(ROUTES.SelectStep)}} className="col-span-1 text-center card shadow-card p-2 aspect-square flex items-center justify-center text-2xl font-bold cursor-pointer">
                    Create Workflow
                </div>
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default Index
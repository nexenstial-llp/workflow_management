import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const CreateProcess = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='container m-auto sm:p-5 p-3'>

            <div className="row d-flex justify-content-center">
                <div className="col-md-4">

                    <div className="card">
                        <div className="card-body">
                            
                        </div>
                    </div>

                </div>
            </div>
            <div className="row">
            <div className="col-md-2">



                <div onClick={()=>{navigate(ROUTES.CreateForm)}} className="col-span-1 card shadow-card p-2 aspect-square flex items-center justify-center text-2xl font-bold cursor-pointer">
                    Process
                </div>
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default CreateProcess
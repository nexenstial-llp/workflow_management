import React from 'react'

import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const CreateProcess = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='container m-auto sm:p-5 p-3 mt-5' >

            <div className="row d-flex justify-content-center align-items-center" style={{marginTop:"150px"}}>
                <div className="col-md-6">

                    <div className="card rounded-lg cursor-pointer shadow-sm mb-3" >
                        
                        <div className="card-header">
                            <h1 style={{fontWeight:"500",fontSize:"25px"}}>Create Process</h1>
                        </div>
                        <div className="card-body p-3">
                       <div className="form-group">
                        <label htmlFor="">Process Name</label>
                        <input type="text" className="form-control" />
                       </div>
                       <div className="form-group">
                        <label htmlFor="">Description</label>
                        <input type="text" className="form-control" />
                       </div>
                       <button onClick={()=>{navigate(ROUTES.CreateForm)}} className="btn btn-success cursor-pointer float-right">Next</button>
                        </div>
                    </div>
                    

                    



                </div>
                
            </div>
            <div className="row">
            <div className="col-md-2">



               
            </div>
           
            </div>
        </div>
    </div>
  )
}

export default CreateProcess
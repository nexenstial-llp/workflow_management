import React from 'react'
import { TiFlowMerge } from 'react-icons/ti'
import { AiOutlineHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/RouterConfig'

const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <div className='h-full w-[200px] shadow-card p-3 '>
            <img src="/assets/images/logo.png" className='w-full my-3 mb-5' alt="" />
            <div className='flex flex-col gap-4'>

                <div onClick={() => { navigate(ROUTES.Workflows) }} className='flex items-center gap-3 rounded-lg p-2.5 px-3 bg-[orange] text-white border cursor-pointer shadow'>
                    <AiOutlineHome /> Home
                </div>
                <div className='flex items-center gap-3 rounded-lg p-2.5 px-3 cursor-pointer shadow'>
                    <TiFlowMerge /> Workflow
                </div>
            </div>
        </div>
    )
}

export default Sidebar
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig';

const AddPermission = () => {

    const location = useLocation();

    const [data, setData] = useState(location.state.data)

    const [tab, setTab] = useState(0)

    const [approvers, setApprovers] = useState([])

    const [flag, setFlag] = useState(false)

    const navigate = useNavigate()

    const permissions = {
        hidden:'hidden',
        editable:'editable',
        readOnly:'read-only'
    }






    useEffect(()=>{
        const arr = []
        for (const i of data.fields) {
            const obj = {
                id:i.id,
                section_id:i.section_id,
                permission:permissions.editable
            }
            arr.push(obj)
        }
        const arr2 = [...data.approvers]

        for (const i of arr2)
        {
            i.access = arr;    
        }
        setApprovers(arr2)
    },[data])


    return (
        <div>
            <div className='w-full p-3 flex justify-between items-center shadow mb-5'>
                <div>
                    Add Permissions
                </div>
                <div className='flex gap-6 items-center'>
                    <button className='border border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center'>
                        cancel
                    </button>
                    <button onClick={()=>navigate(ROUTES.Workflows)} className='bg-blue-600 text-neutral-100 rounded p-1 px-3'>
                        continue
                    </button>
                </div>
            </div>
            <div className="p-4 grid grid-cols-4 gap-4">
                <div className="col-span-1 shadow-card p-3 py-6 flex flex-col gap-6">
                    {
                        approvers?.map((i, key) => (
                            <div onClick={()=>setTab(key)} key={key} className={`hover:bg-blue-500 p-2 rounded-lg cursor-pointer hover:text-white ${key==tab? 'bg-blue-500 text-white' : ''}`}>
                                <div className="text-lg hover:text-white">
                                    {i.title}
                                </div>
                                <div className='text-sm '>
                                    {i.type}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-span-3 shadow-card p-3">
                    {
                        data.sections.map((i, key) => (
                            <section key={key} className='p-3 border mb-3'>
                                <div className='text-xl font-medium mb-10 grid grid-cols-'>
                                    {i.title}
                                </div>
                                <div className='flex flex-col gap-3'>
                                    {
                                        data.fields.filter(s => s.section_id == i.id).map((j, key2) => (
                                            <div className='mb-3 grid sm:grid-cols-6 items-center'>
                                                <div className='col-span-4'>
                                                    {key2 + 1} {j.title}
                                                </div>
                                                <div className='col-span-2 flex gap-3 flex-wrap'>
                                                    <button onClick={()=>{
                                                        console.log(approvers[tab].access);
                                                        for (const iterator of approvers[tab].access) {
                                                            if(iterator.id==j.id&&iterator.section_id==j.section_id) {
                                                                iterator.permission=permissions.editable;
                                                                setFlag(prev=>!prev);
                                                                break
                                                            }
                                                        }
                                                    }} 
                                                    className={`hover:bg-green-500 hover:text-neutral-100 rounded p-1 px-3 ${approvers[tab]?.access.find(s=>s.id==j.id&&s.section_id==j.section_id&&s.permission==permissions.editable)?'bg-green-500 text-neutral-100':''}`} >
                                                        Editable
                                                    </button>
                                                    <button 
                                                    onClick={()=>{
                                                        console.log(approvers[tab]);
                                                        for (const iterator of approvers[tab].access) {
                                                            if(iterator.id==j.id&&iterator.section_id==j.section_id) iterator.permission=permissions.readOnly
                                                        }
                                                        setFlag(prev=>!prev);
                                                    }} 
                                                    className={`hover:bg-orange-500 hover:text-neutral-100 rounded p-1 px-3 ${approvers[tab]?.access.find(s=>s.id==j.id&&s.section_id==j.section_id&&s.permission==permissions.readOnly)?'bg-orange-500 text-neutral-100':''}`}>
                                                        Read Only
                                                    </button>
                                                    <button
                                                     onClick={()=>{
                                                        console.log(approvers[tab]);
                                                        for (const iterator of approvers[tab].access) {
                                                            if(iterator.id==j.id&&iterator.section_id==j.section_id) iterator.permission=permissions.hidden
                                                        }
                                                        setFlag(prev=>!prev);
                                                    }}
                                                    className={`hover:bg-red-500 hover:text-neutral-100 rounded p-1 px-3 ${approvers[tab]?.access.find(s=>s.id==j.id&&s.section_id==j.section_id&&s.permission==permissions.hidden)?'bg-red-500 text-neutral-100':''}`}>
                                                        Hidden
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </section>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default AddPermission
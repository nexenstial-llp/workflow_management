import React, { useState } from 'react'
import EditableLabel from '../../components/Form/EditableLabel'
import Input from '../../components/Form/Input'
import { Dropdown } from 'antd'

//Icons
import { BsCurrencyRupee, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { AiOutlineAlignLeft, AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineCheckSquare, AiOutlineSetting } from 'react-icons/ai'
import { MdShortText } from 'react-icons/md'
import { RiCheckboxMultipleLine } from 'react-icons/ri'
import { TbNumbers } from 'react-icons/tb'
import { RxDropdownMenu } from 'react-icons/rx'
import { BiTime } from 'react-icons/bi'

// Components
import TextArea from '../../components/Form/TextArea'
import CheckBox from '../../components/Form/CheckBox'
import Select from '../../components/Form/Select'
import Radio from '../../components/Form/Radio'
import DatePicker from '../../components/Form/DatePicker'
import TimePicker from '../../components/Form/TimePicker'
import Switch from '../../components/Form/Switch'

const CreateForm = () => {


    //////////Modal Details
    //Add Section Modal

    //Declaring string in variables to avoid typos
    const types = {
        shortAnswer: 'short',
        longAnswer: 'long',
        numeric: 'number',
        checkBox: 'check',
        radio: 'radio',
        select: 'select',
        multiselect: 'multi-select',
        date: 'date',
        time: 'time',
        curreny: 'currency'

    }

    const typesArr = [
        {
            name: types.shortAnswer,
            icon: <MdShortText />
        },
        {
            name: types.longAnswer,
            icon: <AiOutlineAlignLeft />
        },
        {
            name: types.numeric,
            icon: <TbNumbers />
        },
        {
            name: types.checkBox,
            icon: <AiOutlineCheckSquare />
        },
        // {
        //     name: types.radio,
        //     icon: <AiOutlineCheckCircle />
        // },
        {
            name: types.select,
            icon: <RxDropdownMenu />
        },
        // {
        //     name: types.multiselect,
        //     icon: <RiCheckboxMultipleLine />
        // },
        {
            name: types.date,
            icon: <AiOutlineCalendar />
        },
        {
            name: types.time,
            icon: <BiTime />
        },
        {
            name: types.curreny,
            icon: <BsCurrencyRupee />
        },
    ]

    const [openForEdit, setOpenForEdit] = useState()

    //Object of the form
    const [formData, setFormData] = useState([
        {
            title: 'Basic Information',
            id: 1,
            priority: 1,
            items: [
                {
                    id: 1,
                    section_id: 1,
                    type: types.shortAnswer,
                    placeHolder: 'This is placeholder',
                    title: 'What is the name of the item?'
                },
                {
                    id: 2,
                    section_id: 1,
                    type: types.shortAnswer,
                    placeHolder: 'This is placeholder',
                    title: 'What is the name of the item?'
                },
            ]
        }
    ])

    const sections = [
        {
            title:'Unknown Section 1',
            id:1,
            priority:1
        }
    ]

    const fields = [
        {
            id:1,
            title:'Unkown Field 1',
            section_id:1,
            type: types.shortAnswer,
            placeHolder: 'This is placeholder',
        }
    ]

    //For refreshing the component
    const [flag, setFalg] = useState(false)








    ////////////////////////////////////////////////////
    //Helping functions to add functionality in the form
    ////////////////////////////////////////////////////

    //This fnction adds new input field
    const addFeild = (section_id) => {
        const arr = [];
        const obj = {
            id: Math.floor(Math.random() * 90000) + 10000,
            section_id: section_id,
            type: types.shortAnswer,
            placeHolder: 'This is placeholder',
            title: 'What is the name of the item?'
        }

        console.log(obj);
        for (const i of formData) {
            const items = i.items;
            if (section_id === i.id) {
                items.push(obj);
            }
            arr.push({ ...i, items: items })
        }

        setFormData(arr)
    }

    const deleteField = (field) => {
        const arr = []
        for (const i of formData) {
            const obj = i
            const arr2 = []
            if (i.id == field.section_id) {
                for (const j of i.items) {
                    if (field.id === j.id) {
                        continue;
                    }
                    else {
                        arr2.push(j)
                    }
                }
                obj.items = arr2
            }
            arr.push(obj)
        }

        setFormData(arr)
    }

    //This fnction adds new Section
    const addSection = (priority) => {
        const obj = {
            id: formData?.length + 1,
            priority: priority,
            title: "Unkown new section",
            items: [
                {
                    id: Math.floor(Math.random() * 90000) + 10000,
                    section_id: formData?.length + 1,
                    type: types.shortAnswer,
                    placeHolder: 'This is placeholder',
                    title: 'Unkwn input field'
                }
            ]
        }

        const arr = []
        for (const i of formData) {
            arr.push(i)
        }

        arr.push(obj);
        setFormData(arr)
    }


    // This function is responsible for editin label
    const handleLableChange = (e, section_id, field_id) => {
        const arr = []
        for (const i of formData) {
            let obj = {};
            if (i.id === section_id) {
                const arr2 = []
                for (const j of i.items) {
                    let obj2 = {}
                    if (field_id === j.id) {
                        obj2 = { ...j, title: e.target.value }
                    }
                    else {
                        obj2 = { ...j }
                    }

                    arr2.push(obj2)
                    obj = { ...i, items: arr2 }
                }
            }
            else {
                obj = { ...i }
            }
            arr.push(obj)
        }

        setFormData(arr)
    }
    return (
        <div className='CreateForm min-h-screen min-w-screen'>
            <div className='w-full p-3 flex justify-between items-center shadow mb-5'>
                <div>
                    Create Form
                </div>
                <div className='flex gap-6 items-center'>
                    <button className='border border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center'>
                        cancel
                    </button>
                    <button className='bg-blue-600 text-neutral-100 rounded p-1 px-3'>
                        continue
                    </button>
                </div>
            </div>
            <div className="sm:w-[90%] w-[95%] m-auto shadow-card border border-[1px] border-[#F2ECFF] sm:p-10 p-2">
                <div className='text-2xl font-semibold'>
                    This is Title
                </div>
                <div className='text-sm text-neutral-500'>
                    This is description
                </div>
                {
                    formData.map((i, key) => (
                        <section key={key} className='section border border-0 border-b-2 p-2 mt-10 transition-all'>
                            <EditableLabel className='text-xl font-medium w-full duration-500' style={{ wordWrap: 'break-word' }} onChange={(e) => {
                                i.title = e.target.value;
                                setFalg(prev => !prev)
                            }}
                                value={i.title}
                            />
                            {
                                i.items.map((j, key2) => (
                                    <div className={`form-holder mt-5 p-4 rounded-lg transition-all ${openForEdit == j.id ? 'bg-blue-100' : ''}`} key={key2}>
                                        <div className='form-item flex gap-3'>
                                            <div className='input-fields-holder flex flex-col gap-0.5 w-full'>
                                                <EditableLabel value={j.title} className="bg-transparent" onChange={(e) => { handleLableChange(e, j.section_id, j.id) }} />
                                                {
                                                    j.type == types.longAnswer
                                                        ?
                                                        <TextArea className={'h-auto'} readOnly />
                                                        :
                                                        j.type == types.shortAnswer
                                                            ?
                                                            <Input placeholder={j.placeHolder} />
                                                            :
                                                            j.type == types.numeric
                                                                ?
                                                                <Input type={'number'} placeholder={j.placeHolder} />
                                                                :
                                                                j.type == types.checkBox
                                                                    ?
                                                                    <CheckBox />
                                                                    :
                                                                    j.type == types.select
                                                                        ?
                                                                        <Select />
                                                                        :
                                                                        j.type == types.radio
                                                                            ?
                                                                            <Radio />
                                                                            :
                                                                            j.type == types.date
                                                                                ?
                                                                                <DatePicker />
                                                                                :
                                                                                j.type == types.time
                                                                                    ?
                                                                                    <TimePicker />
                                                                                    :
                                                                                    <Input placeholder={j.placeHolder} />

                                                }
                                                <div className={`pt-6 transition-all duration-[2000ms] overflow-hidden ${openForEdit === j.id ? '' : 'h-0'}`}>

                                                    <div className='flex flex-wrap items-center gap-3'>

                                                        {
                                                            typesArr.map((k, key3) => (
                                                                <div onClick={() => {
                                                                    j.type = k.name;
                                                                    setFalg(prev => !prev)
                                                                }}
                                                                    className={`flex flex-col gap-0.5 min-w-[100px] border  p-2 items-center justify-center gap-2 rounded-lg cursor-pointer ${k.name == j.type ? 'bg-blue-800 text-neutral-50' : 'border-blue-800'}`}
                                                                >
                                                                    {k.icon}
                                                                    <div className='text-[10px]'>
                                                                        {k.name}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className='mt-3'>
                                                        <button onClick={() => setOpenForEdit()} className='w-full border border-[1px] border-neutral-500 bg-white text-neutral-500 rounded p-1 px-3 flex items-center justify-center'>
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='settings w-[100px] flex flex-col justify-center gap-4 items-center '>
                                                <div className='flex items-center gap-2 text-sm'>
                                                    <Switch size="small" className={'bg-neutral-400'} />
                                                    required
                                                </div>
                                                <div className='cursor-pointer'>
                                                    <Dropdown
                                                        menu={{
                                                            items: [
                                                                {
                                                                    label: <div className='flex gap-1 items-center' onClick={() => { setOpenForEdit(j.id) }}>
                                                                        <AiOutlineSetting /> Options
                                                                    </div>,
                                                                    key: '0',

                                                                },
                                                                {
                                                                    label: <div className='flex gap-1 items-center text-red-500'>
                                                                        <BsTrash /> Delete
                                                                    </div>,
                                                                    children: [
                                                                        {
                                                                            key: '2-1',
                                                                            label: <div onClick={() => { deleteField(j) }} className='text-red-500'>Yes Delete it!</div>,
                                                                        },
                                                                    ],
                                                                    key: '1',
                                                                },
                                                            ]
                                                        }}
                                                        trigger={['click']}

                                                    >
                                                        <BsThreeDotsVertical />
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                            <div className='flex justify-center mt-6'>
                                <div className='flex gap-2'>
                                    <button onClick={() => { addFeild(i.id) }} className='bg-blue-600 text-neutral-100 rounded p-1 px-3'>
                                        Add field
                                    </button>
                                    <button onClick={() => { addSection(1) }} className='bg-blue-600 text-neutral-100 rounded p-1 px-3'>
                                        Add Section
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))
                }

            </div>
        </div>
    )
}

export default CreateForm
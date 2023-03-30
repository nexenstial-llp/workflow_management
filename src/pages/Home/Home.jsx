import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/RouterConfig'

const Home = () => {

    const navigate = useNavigate()

    const changeDir = (dir) =>{
        navigate(dir)
    }

  return (
    <div className='Home'>
       Navigate to apps
    </div>
  )
}

export default Home
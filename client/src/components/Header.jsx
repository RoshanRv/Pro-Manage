import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='border-b-2 border-black bg-sky-300'>
        <nav className='flex gap-4 p-2 md:p-5'>
            <Link to={'/'} ><h1 className="text-3xl md:text-4xl font-bold">Pro-Manage</h1></Link>
        </nav>
    </header>
  )
}

export default Header
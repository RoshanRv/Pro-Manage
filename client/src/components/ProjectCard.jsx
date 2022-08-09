import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({project}) => {
  return (
    <div className='rounded-lg p-1 bg-white md:p-4 border-2 border-black flex items-center justify-between gap-x-2'>
      <div className="">
        <h1 className="text-2xl my-2 font-semibold">{project.name}</h1>
        <h1 className="text-lg my-1 ">Status: {project.status}</h1>
      </div>
      <Link to={`/projects/${project.id}`} ><button className='py-2 px-3 rounded-lg text-white bg-rose-500' >View Details</button></Link>
       
    </div>
  )
}

export default ProjectCard
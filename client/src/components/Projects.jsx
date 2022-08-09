import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectsQueries'
import Spinner from './Spinner'
import ProjectCard from './ProjectCard'

const Projects = () => {

    const {loading,error,data} = useQuery(GET_PROJECTS)

    if(loading)return <Spinner/>

  return (
    <div className='grid grid-cols-1 my-10 md:grid-cols-2 gap-8 mx-auto'>
        {data.projects.map(project=><ProjectCard key={project.id} project={project}/>)}
    </div>
  )
}

export default Projects
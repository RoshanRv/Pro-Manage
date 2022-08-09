import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectsQueries'
import { useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'


const DeleteProject = ({project}) => {

    const navigate = useNavigate()


    const [deleteProject] = useMutation(DELETE_PROJECT,{variables:{id:project.id},
        onCompleted:()=>navigate('/'),
        refetchQueries:[{query:GET_PROJECTS}]
    })


  return (
    <div className="p-3">
            <button  onClick={deleteProject} className='p-2 rounded-md cursor-pointer text-lg bg-rose-500 text-white  outline-0 block mx-auto w-full'><FaTrash className='inline mx-2' />Delete</button>
    </div>
  )
}

export default DeleteProject
import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { DELETE_PROJECT, UPDATE_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECT, GET_PROJECTS } from '../queries/projectsQueries'

const EditProject = ({project}) => {


    const [name,setName]=useState(project.name)
    const [description,setDescription]=useState(project.description)
    const [status,setStatus]=useState(()=>{
        if(project.status=='Not Started')return 'new'
        if(project.status=='In Progress')return 'progress'
        if(project.status=='Compeleted')return 'completed'
    })

    const [updateProject]  = useMutation(UPDATE_PROJECT,{
        variables:{id:project.id , name,description,status},
        refetchQueries:[{query:GET_PROJECT,variables:{id:project.id}}]
    })

    


    const handleSubmit = (e)=>{
        if(name && description && status){
            e.preventDefault()
            updateProject(name,description,status)
        }
    }

    

  return (
    <form onSubmit={handleSubmit} className='w-full relative p-3 flex flex-col gap-6 '>
        <input type="text" placeholder='Name *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={name} onChange={(e)=>setName(e.target.value)} />
        <textarea type="text"  rows={5} placeholder='Description *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={description} onChange={(e)=>setDescription(e.target.value)} />
        <select required value={status} onChange={(e)=>setStatus(e.target.value)} className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' >
            <option value="">-- Status --</option>
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        <input type="submit" value={'Edit'} className='p-2 rounded-md cursor-pointer text-lg bg-emerald-600 text-white  outline-0 block mx-auto w-full'/>
    </form>
  )
}

export default EditProject
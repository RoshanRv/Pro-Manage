import React,{useState} from 'react'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectsQueries'

const AddProjectModal = ({setShowModel}) => {

    const [name,setName]= useState('')
    const [description,setDescription]= useState('')
    const [status,setStatus]= useState('')
    const [clientId,setClientId]= useState('')

    const {loading,error,data} = useQuery(GET_CLIENTS)

    const [addProject] = useMutation(ADD_PROJECT,{variables:{name,description,status,clientId},
    update(cache,{data:{addProject}}){
        const {projects} = cache.readQuery({query:GET_PROJECTS})
        cache.writeQuery({
            query:GET_PROJECTS,
            data:{projects:[...projects,addProject]}
        })
    }
})
    
    const handleSubmit = (e)=>{
        if(name && description && status && clientId){
            e.preventDefault()
            addProject(name,description,status,clientId)
            setName('')
            setDescription('')
            setStatus('')
            setClientId('')
            setShowModel(false)
        }
    }

  return (
    <div className='w-11/12 border-2 p-2 rounded-lg border-black md:w-9/12 bg-white lg:w-7/12 mx-auto fixed top-1/2 left-1/2 shadow-md shadow-black -translate-x-1/2 -translate-y-1/2'>
        <h1 className="text-3xl text-center font-semibold my-4 text-pink-500">Add Project</h1>
            <button onClick={()=>setShowModel(false)}  className='absolute top-0 text-2xl right-3 font-black font-mono text-pink-500' >x</button>
        <form onSubmit={handleSubmit} className='w-full relative p-3 flex flex-col gap-6'>
            <input type="text" placeholder='Name *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={name} onChange={(e)=>setName(e.target.value)} />
            <textarea type="text"  rows={5} placeholder='Description *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={description} onChange={(e)=>setDescription(e.target.value)} />
            <select required value={status} onChange={(e)=>setStatus(e.target.value)} className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' >
                <option value="">-- Status --</option>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <select required value={clientId} onChange={(e)=>setClientId(e.target.value)} className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' >
                <option value="">-- Client --</option>
                {data.clients.map(client=>(
                    <option value={client.id} key={client.id}>{client.name}</option>
                ))}
            </select>
            <input type="submit" value={'Add'} className='p-2 rounded-md cursor-pointer text-lg bg-pink-500 text-white  outline-0 block mx-auto w-full'/>
        </form>
    </div>
  )
}

export default AddProjectModal
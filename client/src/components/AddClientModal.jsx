import React,{useState} from 'react'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddClientModal = ({setShowModel}) => {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [addClient] = useMutation(ADD_CLIENT,{variables:{name,email,phone},
    update(cache,{data:{addClient}}){
        const {clients} = cache.readQuery({query:GET_CLIENTS})
        cache.writeQuery({
            query:GET_CLIENTS,
            data:{clients:[...clients,addClient]}
        })
    }
})
    
    const handleSubmit = (e)=>{
        if(name && email && phone){
            e.preventDefault()
            addClient(name,email,phone)
            setName('')
            setEmail('')
            setPhone('')
            setShowModel(false)
        }
    }

  return (
    <div className='w-11/12 border-2 p-2 rounded-lg border-black md:w-9/12 bg-white lg:w-7/12 mx-auto fixed top-1/2 left-1/2 shadow-md shadow-black -translate-x-1/2 -translate-y-1/2'>
        <h1 className="text-3xl text-center font-semibold my-4 text-pink-500">Add Client</h1>
            <button onClick={()=>setShowModel(false)}  className='absolute top-0 text-2xl right-3 font-black font-mono text-pink-500' >x</button>
        <form onSubmit={handleSubmit} className='w-full relative p-3 flex flex-col gap-6'>
            <input type="text" placeholder='Name *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder='Email *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="tel" placeholder='Phone *' required className='p-2 border-2 border-black outline-0 rounded-md block mx-auto w-full' value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <input type="submit" value={'Add'} className='p-2 rounded-md cursor-pointer text-lg bg-pink-500 text-white  outline-0 block mx-auto w-full'/>
        </form>
    </div>
  )
}

export default AddClientModal
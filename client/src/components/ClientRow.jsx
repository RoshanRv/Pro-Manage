import React from 'react'
import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectsQueries'

const ClientRow = ({client}) => {

    const [deleteClient] = useMutation(DELETE_CLIENT,{variables:{id:client.id} ,
        refetchQueries:[{query:GET_CLIENTS},{query:GET_PROJECTS}]
    })

  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td><button onClick={deleteClient} className='hover:scale-105  transition-all rounded-lg' ><FaTrash className='bg-red-500 text-white box-content hover:bg-red-600 transition-all p-2 rounded-lg' /></button></td>
    </tr>
  )
}

export default ClientRow
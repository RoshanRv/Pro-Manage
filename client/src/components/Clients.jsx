import React from 'react'
import { gql,useQuery } from '@apollo/client'
import Spinner from './Spinner'
import { GET_CLIENTS } from '../queries/clientQueries'
import ClientRow from './ClientRow'


const Clients = () => {

    const {loading,error,data} = useQuery(GET_CLIENTS)

    if(loading)return <Spinner/>
    if(error)return <h1  >Error Occured</h1>

  return (
    <div className="overflow-x-auto">
        <table className='w-full  my-6 text-center bg-white rounded-lg' >
            <thead>
                <tr  >
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.clients.map(client=>(
                    <ClientRow client={client} key ={client.id}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Clients
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectsQueries'
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import EditProject from '../components/EditProject'
import DeleteProject from '../components/DeleteProject'

const Project = () => {

    const {id} = useParams()
    const {loading,error,data} = useQuery(GET_PROJECT,{variables:{id}})
    console.log(data);

    if(loading)return <Spinner />

  return (
    <main>
        <h1 className="text-4xl font-bold my-4 text-center">Project Info</h1>
        <section className="border-2 bg-white my-10 w-11/12 md:w-9/12 lg:w-7/12 mx-auto border-gray-500 rounded-md p-4 md:p-10">
            <h1 className="text-4xl my-4 font-bold">{data?.project.name}</h1>
            <p className="text-xl my-3 ">{data?.project.description}</p>
            <h1 className="text-2xl font-semibold my-3  mt-10">Project Status</h1>
            <p className="text-xl my-2 ">{data?.project.status}</p>

        {/*             Client Info   */}
            <h1 className='font-semibold text-2xl my-8' >Client Information</h1>
            <div className='border-2 border-gray-400  rounded-lg my-8 mb-4'>
                <h1 className="border-b-2 border-gray-400 p-2"><FaUser className='inline mr-2' />{data.project.client.name}</h1>
                <h1 className="border-b-2 border-gray-400 p-2"><FaEnvelope className='inline mr-2' />{data.project.client.email}</h1>
                <h1 className="p-2"><FaPhone className='inline mr-2' />{data.project.client.phone}</h1>
            </div>
            <hr className='my-10 border border-gray-300'/>

        {/*         Edit Projets */}
        <h1 className='font-semibold text-3xl my-8' >Edit Project Info</h1>
        <EditProject project={data.project} />
        <DeleteProject project={data.project} />

        </section>
    </main>
  )
}

export default Project
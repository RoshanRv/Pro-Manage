import React,{useState} from 'react'
import Clients from "../components/Clients";
import { FaBook ,FaUser } from "react-icons/fa";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from '../components/AddProjectModal';
import Projects from '../components/Projects';


const Home = () => {

    const [showClientModel,setShowClientModel]=useState(false)
    const [showProjectModel,setShowProjectModel]=useState(false)

  return (
    <main className='' >
        <section className='my-4'>
            {/*             buttons  */}
            <div className="flex gap-x-4 items-center">
                <button onClick={()=>setShowClientModel(e=>!e)} className="py-2 px-3 rounded-lg text-left bg-pink-500 text-white" ><FaUser className="box-content inline-block mx-2 text-white" />Add Client</button>
                <button onClick={()=>setShowProjectModel(e=>!e)} className="py-2 px-3 rounded-lg text-left bg-blue-500 text-white" ><FaBook className="box-content inline-block mx-2 text-white" />Add Project</button>
            </div>
            {/*         Projects         */}
            <h1 className="text-3xl mx-auto my-4 font-semibold text-center">Projects</h1>
            <Projects />
            {/*         Clients      */}
            <h1 className="text-3xl mx-auto my-4 font-semibold text-center">Clients</h1>
            {/* clients table */}
            <Clients/>
      </section>
      {/*     models  */}
      {showClientModel&&<AddClientModal setShowModel={setShowClientModel} />}
      {showProjectModel&&<AddProjectModal setShowModel={setShowProjectModel} />}
    </main>
  )
}

export default Home
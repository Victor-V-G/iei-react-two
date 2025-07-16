'use client'

import { useEffect, useState } from "react"
import MostrarDatos from "./components/MostrarDatos"
import { Persona } from "./interfaces/interfacePersona"
import { obtenerPersonas, registrarPersona } from "./FireBase/Promesas"


const InitialStatePersona:Persona={
  nombre: "",
  apellido: ""
}

export default function Home() {
  const miStorage= window.localStorage

  const [Persona, setPersona] = useState(InitialStatePersona)
  const [PersonaActualizar, setPersonaActualizar] = useState<Persona[]>([])
  const [Personas, setPersonas] = useState<Persona[]>([])

  useEffect(() => {
    obtenerPersonas().then((listado)=>{
      setPersonas(listado)
    }).catch((error)=>{
        alert("no se pudo cargar el listado")
        console.log(error)
    })
  }, [])





  const handlePersona=(name:string,value:string)=>{
    setPersona(
      {...Persona,[name]:value}
    )
  }

  const handlePersonaActualizar=(name:string,value:string)=>{
    setPersonaActualizar(
      {...PersonaActualizar,[name]:value}
    )
  }

  const handleRegistrar=()=>{
    miStorage.setItem("Personas",JSON.stringify([...Personas,Persona]))
    registrarPersona(Persona).then(()=>{
      alert("Registro con exito")
    }).catch((error)=>{
      alert("Hubo un problema con el registro")
      console.log(error)
    })
  }

  const handleRegistrarActualizar=()=>{
    miStorage.setItem("PersonaActualizar",JSON.stringify([...PersonaActualizar,Persona]))
  }

  const handleUpdate = (p:Persona)=>{
    setPersona(p)
  }

  return (
    <div className="form-text">
      <form>
        <h1>PERSONAS: {Persona.nombre} {Persona.apellido} </h1>
        <input 
          type="text" 
          name="nombre"
          onChange={(evento)=>handlePersona(evento.currentTarget.name,evento.currentTarget.value)}
        /> <br />
        <input 
          type="text" 
          name="apellido"
          onChange={(evento)=>handlePersona(evento.currentTarget.name,evento.currentTarget.value)}
          /> <br />
        <button
          type="button"
          onClick={()=>handleRegistrar()}>REGISTRAR
        </button>
      </form>

      <MostrarDatos traerDatos = {handleUpdate}/>

      <form>
        <h1>PERSONAS ACTUALIZAR</h1>
        <input 
          type="text" 
          name="nombre"
          value={Persona.nombre}
          onChange={(evento)=>handlePersonaActualizar(evento.currentTarget.name,evento.currentTarget.value)}
        /> <br />
        <input 
          type="text" 
          name="apellido"
          value={Persona.apellido}
          onChange={(evento)=>handlePersonaActualizar(evento.currentTarget.name,evento.currentTarget.value)}
          /> <br />
        <button
          onClick={()=>handleRegistrarActualizar()}>ACTUALIZAR
        </button>
      </form>
    </div>
  );
}

'use client'

import { useEffect, useState } from "react"
import MostrarDatos from "./components/MostrarDatos"
import { Persona } from "./interfaces/interfacePersona"


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
    let ListadoStr = miStorage.getItem("Personas")
    if (ListadoStr != null){
      let ListadoParse = JSON.parse(ListadoStr)
      setPersonas(ListadoParse)
    }
  }, [])


  useEffect(() => {
    let ListadoStrActualizar = miStorage.getItem("PersonaActualizar")
    if (ListadoStrActualizar != null){
      let ListadoParseActualizar = JSON.parse(ListadoStrActualizar)
      setPersonas(ListadoParseActualizar)
    }
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

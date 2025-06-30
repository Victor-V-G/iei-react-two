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
  const [Personas, setPersonas] = useState<Persona[]>([])

  useEffect(() => {
    let ListadoStr = miStorage.getItem("Personas")
    if (ListadoStr != null){
      let ListadoParse = JSON.parse(ListadoStr)
      setPersonas(ListadoParse)
    }
  }, [])
  
  const handlePersona=(name:string,value:string)=>{
    setPersona(
      {...Persona,[name]:value}
    )
  }

  const handleRegistrar=()=>{
    miStorage.setItem("Personas",JSON.stringify([...Personas,Persona]))
  }

  return (
      <form className="form-text">
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
          onClick={()=>handleRegistrar()}>IKYI.SX
        </button>
        <form>
            <MostrarDatos/>
        </form>
      </form>
  );
}

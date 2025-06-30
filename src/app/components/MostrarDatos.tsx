
import React from "react";
import { useEffect, useState } from "react";
import { Persona } from '../interfaces/interfacePersona'

export const MostrarDatos = () => {
    const miStorage= window.localStorage
    
    // const [Persona, setPersona] = useState(InitialStatePersona)
    const [Personas, setPersonas] = useState<Persona[]>([])

    useEffect(() => {
        let ListadoStr = miStorage.getItem("Personas")
        if (ListadoStr != null){
          let ListadoParse = JSON.parse(ListadoStr)
          setPersonas(ListadoParse)
        }
      }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>NOMBRE</td> <br />
                        <td>APELLIDO</td> <br />
                        <td>ACCION</td> <br />
                    </tr>
                </thead>
                <tbody>
                    {
                        Personas.map((p)=>{
                            return(
                                <tr>
                                    <td>{p.nombre}</td> <br />
                                    <td>{p.apellido}</td> <br />
                                    <td><button>EDITAR</button><button>ELIMINAR</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        
        </>
    );
}

export default MostrarDatos
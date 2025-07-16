import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "./Conexion";
import { Persona } from "../interfaces/interfacePersona";

export const registrarPersona = async(p:Persona)=> {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Personas"), p);
    console.log("Document written with ID: ", docRef.id);
}

export const obtenerPersonas = async()=>{
let listado:Persona[] = []
    const querySnapshot = await getDocs(collection(db, "Personas"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let Persona:Persona = {
        nombre: doc.data().nombre,
        apellido: doc.data().apellido
    }
    listado.push(Persona)
    console.log(doc.id, " => ", doc.data());
    });
return listado
}
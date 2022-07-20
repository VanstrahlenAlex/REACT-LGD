import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto
    }) => {

    //2. función para el mensaje
    const [mensaje, setMensaje] = useState('')

    //Función para administrar el presupuesto. 
    const handlePresupuesto = (e) =>{
        //1.nombrar el prevent default
        e.preventDefault();
        
        if(!presupuesto || presupuesto < 0){
            setMensaje('No es un presupuesto valido')
            return
        } 
        setMensaje('')
        setIsValidPresupuesto(true)

    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Añade tu presupuesto'
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value='Añadir' />
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto
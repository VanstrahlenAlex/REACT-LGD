import { useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() =>{
      const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2) ;
        


      //le pasamos el total disponible
      setDisponible(totalDisponible)
      setGastado(totalGastado);
      //Se coloca dentro de setTimeOut para 
      setTimeout(() =>{
        setPorcentaje(nuevoPorcentaje)

      }, 1500)
    }, [gastos])


    //Función para formatear la cantidad a un valor monetario
    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }

    const handeleResetApp = () =>{
        const resultado = confirm('¿Desea reiniciar presupuesto y gastos?');
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columna'>
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handeleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:  </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:  </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:  </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ControlPresupuesto
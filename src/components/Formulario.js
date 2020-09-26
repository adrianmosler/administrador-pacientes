import React, {Fragment , useState} from 'react';
import { v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    const [cita, actualizarCita] = useState({
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas : ''
    });

    const [error, actualizarError] = useState(false);

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value,
             
        })
    }

    const { mascota, propietario, fecha, hora, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault();
        let validateFields = mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '';
        if(validateFields){
            actualizarError(true);
            return;
        }else{
            actualizarError(false);
        }

        cita.id = uuidv4();
        
        //Crear la cita
        crearCita(cita);
        
        //limpiar el formulario
        actualizarCita({
            mascota : '',
            propietario : '',
            fecha : '',
            hora : '',
            sintomas : ''
        })
    }

    return (  
        <Fragment>
            <h2>Crear cita</h2>
            { error ? <div className = 'alerta-error'> Todos los campos son obligatorios</div> : null }
            <form
                onSubmit = {submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type = 'text'
                    name = 'mascota'
                    className = 'u-full-width'
                    placeholder = 'Nombre mascota'
                    onChange = {actualizarState}
                    value = {mascota}
                />

                <label>Nombre dueño</label>
                <input
                    type = 'text'
                    name = 'propietario'
                    className = 'u-full-width'
                    placeholder = 'Nombre dueño de la mascota'
                    onChange = {actualizarState}
                    value = {propietario}
                />

                <label>Fecha</label>
                <input
                    type = 'date'
                    name = 'fecha'
                    className = 'u-full-width'
                    onChange = {actualizarState}
                    value = {fecha}
                />

                <label>Hora</label>
                <input
                    type = 'time'
                    name = 'hora'
                    className = 'u-full-width'
                    onChange = {actualizarState}
                    value = {hora}
                />

                <label>Síntomas</label>
                <textarea
                    className = 'u-full-width'
                    name = 'sintomas'
                    onChange = {actualizarState}
                    value = {sintomas}
                >
                </textarea>
                <button
                    className = 'u-full-width button-primary'
                >
                    Agregar cita
                </button>

            </form>
        </Fragment>
    );
}

Formulario.propType = {
    crearCita : PropTypes.func.isRequired
}
 
export default Formulario;
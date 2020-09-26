import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) citasIniciales = [];

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(()=>{
    localStorage.setItem('citas', JSON.stringify(citas)); //localStorage solamente soporta strings
  },[citas]);//es como un $(document).ready que escucha en este caso los cambios de citas

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  const eliminarCita = id => {
    const filtroCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(filtroCitas);
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1> Administrador de pacientes</h1>
      <div className = 'container'>
         <div className = 'row'>
            <div className = 'one-half column'>
              <Formulario
                  crearCita = {crearCita}
              />
            </div>
            <div className = 'one-half column'>
                  <h2>{titulo}</h2>
                  { citas.map( cita => (
                      <Cita
                        key={cita.id}//cuando se itera hay que ponerle el key
                        cita={cita}
                        eliminarCita={eliminarCita}
                      />
                    )
                  )}
            </div>
         </div>
      </div>
      
      
    </Fragment>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import styles from './Auditoria.module.css';

const Auditoria = () => {
const [personasAuditadas, setPersonasAuditadas] = useState([]);
const [juridicosAuditados, setJuridicosAuditados] = useState([]);

/**/
//useEffect de Personas
/**/
  useEffect(() => {
    fetch('http://localhost:3000/api/auditoria-personas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setPersonasAuditadas(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



/**/
//useEffect de Personas
/**/
useEffect(() => {
  fetch('http://localhost:3000/api/auditoria-juridicos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then(data => {
    console.log('DATA GET juri', data);
    setJuridicosAuditados(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

/**/
/**/




  //handle de personas
  const handleVerificationChange = (id, field, value) => {
    const updatedPersonas = personasAuditadas.map(persona => {
      if (persona.id === id) {
        return { ...persona, [field]: value };
      }
      return persona;
    });

    setPersonasAuditadas(updatedPersonas);

    fetch(`http://localhost:3000/api/verificar-persona/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [field]: value })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Actualización exitosa:', data);
      })
      .catch(error => {
        console.error('Error al actualizar los campos de verificación:', error);
      });
  };

  //getEstado de personas
  const getEstado = (persona) => {
    const camposVerificados = [
      'verificarNombresCompletos',
      'verificarNumeroIdentificacion',
      'verificarTipoIdentificacion',
      'verificarNacionalidad',
      'verificarCiudadResidencia',
      'verificarDireccion',
      'verificarCorreoElectronico',
      'verificarTelefonoCelular',
      'verificarDescripcionOrigenFondos',
      'verificarCcPhotoUrl',
      'verificarRutPhotoUrl',
    ];
    const todosVerificados = camposVerificados.every(campo => persona[campo]);
    return todosVerificados ? 'Aprobado' : 'En proceso';
  };

  return (
    <div className={styles.Auditoria}>
      {/* PERSONAS */}
      <div className={styles.tableContainer}>
        <h1>Auditoria Personas Naturales</h1>
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Nombres</th>
              <th># ID</th>
              <th>Tipo ID</th>
              <th>Nacional</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Celular</th>
              <th>O. Fondos</th>
              <th>Cédula</th>
              <th>Rut</th>
              {/* Agrega más encabezados según sea necesario */}
            </tr>
          </thead>
          <tbody>
            {personasAuditadas.map(persona => (
              <tr key={persona.id}>
                <td>
                  <button className={`${styles.estadoButton} ${getEstado(persona) === 'Aprobado' ? styles.aprobado : styles.enProceso}`}>
                    {getEstado(persona)}
                  </button>
                </td>
                <td>
                  {persona.nombresCompletos}
                  <select
                    value={persona.verificarNombresCompletos ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarNombresCompletos', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.numeroIdentificacion*/}
                  <select
                    value={persona.verificarNumeroIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarNumeroIdentificacion', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.tipoIdentificacion*/}
                  <select
                    value={persona.verificarTipoIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarTipoIdentificacion', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.nacionalidad*/}
                  <select
                    value={persona.verificarNacionalidad ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarNacionalidad', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.ciudadResidencia*/}
                  <select
                    value={persona.verificarCiudadResidencia ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarCiudadResidencia', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.direccion*/}
                  <select
                    value={persona.verificarDireccion ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarDireccion', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.correoElectronico*/}
                  <select
                    value={persona.verificarCorreoElectronico ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarCorreoElectronico', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.telefonoCelular*/}
                  <select
                    value={persona.verificarTelefonoCelular ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarTelefonoCelular', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.descripcionOrigenFondos*/}
                  <select
                    value={persona.verificarDescripcionOrigenFondos ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarDescripcionOrigenFondos', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.ccPhotoUrl*/}
                  <select
                    value={persona.verificarCcPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarCcPhotoUrl', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                <td>
                  {/*persona.rutPhotoUrl*/}
                  <select
                    value={persona.verificarRutPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChange(persona.id, 'verificarRutPhotoUrl', e.target.value === "1")}
                  >
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </td>
                {/* Agrega más celdas y selects según sea necesario */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* JURIDICOS */}
      <div className={styles.tableContainer}>
        <h1>Auditoria Juridicos</h1>
     
      </div>
    </div>
  );
}

export default Auditoria;

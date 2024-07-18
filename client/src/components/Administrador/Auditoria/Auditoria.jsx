import React, { useEffect, useState } from 'react';
import styles from './Auditoria.module.css';

const Auditoria = ({ auditoriaUpdate }) => {
  const [personasAuditadas, setPersonasAuditadas] = useState([]);
  const [juridicosAuditados, setJuridicosAuditados] = useState([]);

  // useEffect para Personas
  useEffect(() => {
    fetch('https://nuevawebactivosdigitales.onrender.com/api/auditoria-personas', {
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
  }, [auditoriaUpdate]);

  // useEffect para Juridicos
  useEffect(() => {
    fetch('https://nuevawebactivosdigitales.onrender.com/api/auditoria-juridicos', {
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
  }, [auditoriaUpdate]);

  // Manejador de actualización para Personas
  const handleVerificationChangePersona = (id, field, value) => {
    const updatedPersonas = personasAuditadas.map(persona => {
      if (persona.id === id) {
        return { ...persona, [field]: value };
      }
      return persona;
    });

    setPersonasAuditadas(updatedPersonas);

    fetch(`https://nuevawebactivosdigitales.onrender.com/api/verificar-persona/${id}`, {
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

  // Manejador de actualización para Juridicos
  const handleVerificationChangeJuridico = (id, field, value) => {
    const updatedJuridicos = juridicosAuditados.map(juridico => {
      if (juridico.id === id) {
        return { ...juridico, [field]: value };
      }
      return juridico;
    });

    setJuridicosAuditados(updatedJuridicos);

    fetch(`http://localhost:3000/api/verificar-juridico/${id}`, {
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

  // Función para obtener el estado de verificación de Personas
  const getEstadoPersona = (persona) => {
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

  // Función para obtener el estado de verificación de Juridicos
  const getEstadoJuridico = (juridico) => {
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
      'verificarCamaraComercioUrl',
      'verificarCedulaRepresentanteLegalUrl',
      'verificarEstadosFinancierosUrl',
      'verificarCertificadoBancarioUrl',
      'verificarComposicionAccionariaUrl'
    ];
    const todosVerificados = camposVerificados.every(campo => juridico[campo]);
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
                  <button className={`${styles.estadoButton} ${getEstadoPersona(persona) === 'Aprobado' ? styles.aprobado : styles.enProceso}`}>
                    {getEstadoPersona(persona)}
                  </button>
                </td>
                <td>
                  <div className={styles.nameContainer}>
                    {persona.nombresCompletos}
                    <select
                      value={persona.verificarNombresCompletos ? "1" : "0"}
                      onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarNombresCompletos', e.target.value === "1")}
                      className={styles.selectUnderName}
                    >
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <select
                    value={persona.verificarNumeroIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarNumeroIdentificacion', e.target.value === "1")}
                    className={persona.verificarNumeroIdentificacion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarTipoIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarTipoIdentificacion', e.target.value === "1")}
                    className={persona.verificarTipoIdentificacion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarNacionalidad ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarNacionalidad', e.target.value === "1")}
                    className={persona.verificarNacionalidad ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarCiudadResidencia ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarCiudadResidencia', e.target.value === "1")}
                    className={persona.verificarCiudadResidencia ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarDireccion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarDireccion', e.target.value === "1")}
                    className={persona.verificarDireccion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarCorreoElectronico ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarCorreoElectronico', e.target.value === "1")}
                    className={persona.verificarCorreoElectronico ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarTelefonoCelular ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarTelefonoCelular', e.target.value === "1")}
                    className={persona.verificarTelefonoCelular ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarDescripcionOrigenFondos ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarDescripcionOrigenFondos', e.target.value === "1")}
                    className={persona.verificarDescripcionOrigenFondos ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarCcPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarCcPhotoUrl', e.target.value === "1")}
                    className={persona.verificarCcPhotoUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={persona.verificarRutPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarRutPhotoUrl', e.target.value === "1")}
                    className={persona.verificarRutPhotoUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* JURIDICOS */}
      <div className={styles.tableContainer}>
        <h1>Auditoria Juridicos</h1>
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
              <th>Camara Comercio</th>
              <th>Cédula Represent</th>
              <th>Edo. Financiero</th>
              <th>Cert. Bancario</th>
              <th>Comp. Accion.</th>
              {/* Agrega más encabezados según sea necesario */}
            </tr>
          </thead>
          <tbody>
            {juridicosAuditados.map(juridico => (
              <tr key={juridico.id}>
                <td>
                  <button className={`${styles.estadoButton} ${getEstadoJuridico(juridico) === 'Aprobado' ? styles.aprobado : styles.enProceso}`}>
                    {getEstadoJuridico(juridico)}
                  </button>
                </td>
                <td>
                  <div className={styles.nameContainer}>
                    {juridico.nombresCompletos}
                    <select
                      value={juridico.verificarNombresCompletos ? "1" : "0"}
                      onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarNombresCompletos', e.target.value === "1")}
                      className={styles.selectUnderName}
                    >
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <select
                    value={juridico.verificarNumeroIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarNumeroIdentificacion', e.target.value === "1")}
                    className={juridico.verificarNumeroIdentificacion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarTipoIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarTipoIdentificacion', e.target.value === "1")}
                    className={juridico.verificarTipoIdentificacion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarNacionalidad ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarNacionalidad', e.target.value === "1")}
                    className={juridico.verificarNacionalidad ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCiudadResidencia ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCiudadResidencia', e.target.value === "1")}
                    className={juridico.verificarCiudadResidencia ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarDireccion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarDireccion', e.target.value === "1")}
                    className={juridico.verificarDireccion ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCorreoElectronico ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCorreoElectronico', e.target.value === "1")}
                    className={juridico.verificarCorreoElectronico ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarTelefonoCelular ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarTelefonoCelular', e.target.value === "1")}
                    className={juridico.verificarTelefonoCelular ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarDescripcionOrigenFondos ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarDescripcionOrigenFondos', e.target.value === "1")}
                    className={juridico.verificarDescripcionOrigenFondos ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCcPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCcPhotoUrl', e.target.value === "1")}
                    className={juridico.verificarCcPhotoUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarRutPhotoUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarRutPhotoUrl', e.target.value === "1")}
                    className={juridico.verificarRutPhotoUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCamaraComercioUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCamaraComercioUrl', e.target.value === "1")}
                    className={juridico.verificarCamaraComercioUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCedulaRepresentanteLegalUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCedulaRepresentanteLegalUrl', e.target.value === "1")}
                    className={juridico.verificarCedulaRepresentanteLegalUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarEstadosFinancierosUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarEstadosFinancierosUrl', e.target.value === "1")}
                    className={juridico.verificarEstadosFinancierosUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarCertificadoBancarioUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarCertificadoBancarioUrl', e.target.value === "1")}
                    className={juridico.verificarCertificadoBancarioUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
                <td>
                  <select
                    value={juridico.verificarComposicionAccionariaUrl ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarComposicionAccionariaUrl', e.target.value === "1")}
                    className={juridico.verificarComposicionAccionariaUrl ? styles.optionSi : styles.optionNo}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Auditoria;

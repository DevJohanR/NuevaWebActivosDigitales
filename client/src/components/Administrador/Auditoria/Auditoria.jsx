import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaCheck, FaEye, FaCog } from 'react-icons/fa';
import styles from './Auditoria.module.css';

const Auditoria = ({ auditoriaUpdate }) => {
  const [personasAuditadas, setPersonasAuditadas] = useState([]);
  const [juridicosAuditados, setJuridicosAuditados] = useState([]);

  // useEffect para Personas
  useEffect(() => {
    fetch('http://localhost:3000/api/auditoria-personas')
      .then(response => response.json())
      .then(data => setPersonasAuditadas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [auditoriaUpdate]);

  // useEffect para Juridicos
  useEffect(() => {
    fetch('http://localhost:3000/api/auditoria-juridicos')
      .then(response => response.json())
      .then(data => setJuridicosAuditados(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [auditoriaUpdate]);

  // Manejador de rechazo para Personas
  const handleRechazarPersona = (id) => {
    if (!id || isNaN(id)) {
      console.error('ID inválido:', id);
      Swal.fire({
        title: 'Error',
        text: 'ID de persona inválido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Causa de rechazo',
      input: 'select',
      inputOptions: {
        'INFORMACIÓN INCOMPLETA': 'INFORMACIÓN INCOMPLETA',
        'INFORMACIÓN ERRADA': 'INFORMACIÓN ERRADA',
        'SIN DOCUMENTOS': 'SIN DOCUMENTOS',
        'DOCUMENTO ERRADO': 'DOCUMENTO ERRADO',
        'DOCUMENTOS INCOMPLETOS': 'DOCUMENTOS INCOMPLETOS',
        'OTROS': 'OTROS'
      },
      inputPlaceholder: 'Selecciona una causa',
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'Cancelar',
      preConfirm: (value) => {
        if (value === 'OTROS') {
          return Swal.fire({
            title: 'Especifica la causa',
            input: 'text',
            inputPlaceholder: 'Describe la causa de rechazo',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            preConfirm: (inputValue) => {
              if (!inputValue) {
                Swal.showValidationMessage('Debes especificar una causa');
              }
              return inputValue;
            }
          }).then((result) => {
            if (result.isConfirmed) {
              return result.value;
            } else {
              return null;
            }
          });
        } else {
          return value;
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const causaRechazo = result.value;

        fetch(`http://localhost:3000/api/rechazar-persona/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ causaRechazo })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            Swal.fire({
              title: 'Rechazado',
              text: 'El estado de la persona ha sido actualizado a "Rechazado".',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            setPersonasAuditadas(prev =>
              prev.map(persona =>
                persona.id === id ? { ...persona, rechazado: true, causaRechazo } : persona
              )
            );
            if (typeof auditoriaUpdate === 'function') {
              auditoriaUpdate(); // Actualiza la lista de personas auditadas
            }
          })
          .catch(error => {
            console.error('Error al rechazar la persona:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al intentar rechazar a la persona.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  };

  // Manejador de rechazo para Juridicos (similar al de personas)
  const handleRechazarJuridico = (id) => {
    if (!id || isNaN(id)) {
      console.error('ID inválido:', id);
      Swal.fire({
        title: 'Error',
        text: 'ID de jurídico inválido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Causa de rechazo',
      input: 'select',
      inputOptions: {
        'INFORMACIÓN INCOMPLETA': 'INFORMACIÓN INCOMPLETA',
        'INFORMACIÓN ERRADA': 'INFORMACIÓN ERRADA',
        'SIN DOCUMENTOS': 'SIN DOCUMENTOS',
        'DOCUMENTO ERRADO': 'DOCUMENTO ERRADO',
        'DOCUMENTOS INCOMPLETOS': 'DOCUMENTOS INCOMPLETOS',
        'OTROS': 'OTROS'
      },
      inputPlaceholder: 'Selecciona una causa',
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'Cancelar',
      preConfirm: (value) => {
        if (value === 'OTROS') {
          return Swal.fire({
            title: 'Especifica la causa',
            input: 'text',
            inputPlaceholder: 'Describe la causa de rechazo',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            preConfirm: (inputValue) => {
              if (!inputValue) {
                Swal.showValidationMessage('Debes especificar una causa');
              }
              return inputValue;
            }
          }).then((result) => {
            if (result.isConfirmed) {
              return result.value;
            } else {
              return null;
            }
          });
        } else {
          return value;
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const causaRechazo = result.value;

        fetch(`http://localhost:3000/api/rechazar-juridico/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ causaRechazo })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            Swal.fire({
              title: 'Rechazado',
              text: 'El estado del jurídico ha sido actualizado a "Rechazado".',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            setJuridicosAuditados(prev =>
              prev.map(juridico =>
                juridico.id === id ? { ...juridico, rechazado: true, causaRechazo } : juridico
              )
            );
            if (typeof auditoriaUpdate === 'function') {
              auditoriaUpdate(); // Actualiza la lista de jurídicos auditados
            }
          })
          .catch(error => {
            console.error('Error al rechazar el jurídico:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al intentar rechazar al jurídico.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  };

  // Manejador de actualización para Personas
  const handleVerificationChangePersona = (id, field, value) => {
    setPersonasAuditadas(prev => prev.map(persona => {
      if (persona.id === id) {
        return { ...persona, [field]: value };
      }
      return persona;
    }));

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
        if (typeof auditoriaUpdate === 'function') {
          auditoriaUpdate(); // Asegura que la UI se actualice
        }
      })
      .catch(error => {
        console.error('Error al actualizar los campos de verificación:', error);
      });
  };

  // Manejador de actualización para Juridicos
  const handleVerificationChangeJuridico = (id, field, value) => {
    setJuridicosAuditados(prev => prev.map(juridico => {
      if (juridico.id === id) {
        return { ...juridico, [field]: value };
      }
      return juridico;
    }));

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
        if (typeof auditoriaUpdate === 'function') {
          auditoriaUpdate(); // Asegura que la UI se actualice
        }
      })
      .catch(error => {
        console.error('Error al actualizar los campos de verificación:', error);
      });
  };

  // Función para obtener el estado de verificación de Personas
  const getEstadoPersona = (persona) => {
    if (persona.rechazado) {
      return (
        <button
          className={`${styles.estadoButton} ${styles.rechazado}`}
          onClick={() => {
            Swal.fire({
              title: 'Causa de rechazo',
              text: persona.causaRechazo || 'No se especificó una causa.',
              icon: 'info',
              confirmButtonText: 'OK'
            });
          }}
        >
          <span className={styles.icono}>
            <FaEye />
          </span> R
        </button>
      );
    }

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
    if (todosVerificados) {
      return (
        <button className={`${styles.estadoButton} ${styles.aprobado}`}>
          <span className={styles.icono}>
            <FaCheck />
          </span> A
        </button>
      );
    }
    return (
      <button className={`${styles.estadoButton} ${styles.enProceso}`}>
        <span className={styles.icono}>
          <FaCog />
        </span> P
      </button>
    );
  };

  // Función para obtener el estado de verificación de Juridicos
  const getEstadoJuridico = (juridico) => {
    if (juridico.rechazado) {
      return (
        <button
          className={`${styles.estadoButton} ${styles.rechazado}`}
          onClick={() => {
            Swal.fire({
              title: 'Causa de rechazo',
              text: juridico.causaRechazo || 'No se especificó una causa.',
              icon: 'info',
              confirmButtonText: 'OK'
            });
          }}
        >
          <span className={styles.icono}>
            <FaEye />
          </span> R
        </button>
      );
    }

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
    if (todosVerificados) {
      return (
        <button className={`${styles.estadoButton} ${styles.aprobado}`}>
          <span className={styles.icono}>
            <FaCheck />
          </span> A
        </button>
      );
    }
    return (
      <button className={`${styles.estadoButton} ${styles.enProceso}`}>
        <span className={styles.icono}>
          <FaCog />
        </span> P
      </button>
    );
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
                <td>{getEstadoPersona(persona)}</td>
                <td>
                  <div className={styles.nameContainer}>
                    {persona.nombresCompletos}
                    <select
                      value={persona.verificarNombresCompletos ? "1" : "0"}
                      onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarNombresCompletos', e.target.value === "1")}
                      className={styles.selectUnderName}
                      disabled={persona.rechazado}
                    >
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                    <button className={styles.rechazarButton} onClick={() => handleRechazarPersona(persona.id)}>
                      Rechazar
                    </button>
                  </div>
                </td>
                <td>
                  <select
                    value={persona.verificarNumeroIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangePersona(persona.id, 'verificarNumeroIdentificacion', e.target.value === "1")}
                    className={persona.verificarNumeroIdentificacion ? styles.optionSi : styles.optionNo}
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                    disabled={persona.rechazado}
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
                <td>{getEstadoJuridico(juridico)}</td>
                <td>
                  <div className={styles.nameContainer}>
                    {juridico.nombresCompletos}
                    <select
                      value={juridico.verificarNombresCompletos ? "1" : "0"}
                      onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarNombresCompletos', e.target.value === "1")}
                      className={styles.selectUnderName}
                      disabled={juridico.rechazado}
                    >
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                    <button className={styles.rechazarButton} onClick={() => handleRechazarJuridico(juridico.id)}>
                      Rechazar
                    </button>
                  </div>
                </td>
                <td>
                  <select
                    value={juridico.verificarNumeroIdentificacion ? "1" : "0"}
                    onChange={(e) => handleVerificationChangeJuridico(juridico.id, 'verificarNumeroIdentificacion', e.target.value === "1")}
                    className={juridico.verificarNumeroIdentificacion ? styles.optionSi : styles.optionNo}
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
                    disabled={juridico.rechazado}
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
};

export default Auditoria;

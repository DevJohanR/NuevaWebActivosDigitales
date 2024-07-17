import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaInfoCircle } from 'react-icons/fa';
import styles from './Personas.module.css';

const Personas = ({ setSelectedUser, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/personas')
      .then(response => {
        console.log('Datos Personas:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(persona =>
    Object.entries(persona).some(([key, value]) =>
      key !== 'ccPhotoUrl' && key !== 'rutPhotoUrl' && key !== 'camaraComercioUrl' &&
      key !== 'cedulaRepresentanteLegalUrl' && key !== 'estadosFinancierosUrl' &&
      key !== 'certificadoBancarioUrl' && key !== 'composicionAccionariaUrl' &&
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showAlert = (persona) => {
    Swal.fire({
      title: 'Información Detallada',
      html: `
        <p><strong>ID:</strong> ${persona.id}</p>
        <p><strong>Nombres Completos:</strong> ${persona.nombresCompletos}</p>
        <p><strong>Número Identificación:</strong> ${persona.numeroIdentificacion}</p>
        <p><strong>Tipo Identificación:</strong> ${persona.tipoIdentificacion}</p>
        <p><strong>Nacionalidad:</strong> ${persona.nacionalidad}</p>
        <p><strong>Ciudad Residencia:</strong> ${persona.ciudadResidencia}</p>
        <p><strong>Dirección:</strong> ${persona.direccion}</p>
        <p><strong>Correo Electrónico:</strong> ${persona.correoElectronico}</p>
        <p><strong>Teléfono Celular:</strong> ${persona.telefonoCelular}</p>
        <p><strong>Origen de Fondos:</strong> ${persona.descripcionOrigenFondos}</p>
        <p><strong>Foto CC:</strong> <a href="${persona.ccPhotoUrl}" target="_blank" rel="noopener noreferrer">Ver Foto</a></p>
        <p><strong>Foto RUT:</strong> <a href="${persona.rutPhotoUrl}" target="_blank" rel="noopener noreferrer">Ver Foto</a></p>
      `,
      confirmButtonText: 'Cerrar',
      showCancelButton: true,

      cancelButtonText: 'Auditar'
      
    }).then((result)=>{
      if (result.dismiss === Swal.DismissReason.cancel){
        console.log('Datos a enviar:', persona)

        fetch('http://localhost:3000/api/auditoria-personas', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(persona)
        })
        .then(response=>response.json())
        .then(data =>{
          console.log('Exito', data);
        })
        .catch((error)=>{
          console.error('Error', error)
        })
      }
    })
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KYC Personas</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombres Completos</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((persona) => (
            <tr key={persona.id} onClick={() => showAlert(persona)}>
              <td className={styles.nameCell}>
                {persona.nombresCompletos}
                <FaInfoCircle className={styles.icon} />
                {searchTerm && (
                  <div className={styles.highlight}>
                    {Object.entries(persona).map(([key, value]) =>
                      key !== 'ccPhotoUrl' && key !== 'rutPhotoUrl' && key !== 'camaraComercioUrl' &&
                      key !== 'cedulaRepresentanteLegalUrl' && key !== 'estadosFinancierosUrl' &&
                      key !== 'certificadoBancarioUrl' && key !== 'composicionAccionariaUrl' &&
                      String(value).toLowerCase().includes(searchTerm.toLowerCase()) ? (
                        <div key={key} className={styles.highlightItem}>
                          {key}: {value}
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Personas;

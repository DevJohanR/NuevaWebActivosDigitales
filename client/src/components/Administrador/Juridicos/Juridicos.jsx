import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaInfoCircle } from 'react-icons/fa';
import styles from './Juridicos.module.css';

const Juridicos = ({ setSelectedJuridico, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/juridicos')
      .then(response => {
        console.log('Datos Juridicos:', response.data)
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(juridico =>
    Object.entries(juridico).some(([key, value]) =>
      key !== 'ccPhotoUrl' && key !== 'rutPhotoUrl' && key !== 'camaraComercioUrl' &&
      key !== 'cedulaRepresentanteLegalUrl' && key !== 'estadosFinancierosUrl' &&
      key !== 'certificadoBancarioUrl' && key !== 'composicionAccionariaUrl' &&
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showAlert = (juridico) => {
    Swal.fire({
      title: 'Información Detallada',
      html: `
        <p><strong>ID:</strong> ${juridico.id}</p>
        <p><strong>Nombres Completos:</strong> ${juridico.nombresCompletos}</p>
        <p><strong>Número Identificación:</strong> ${juridico.numeroIdentificacion}</p>
        <p><strong>Tipo Identificación:</strong> ${juridico.tipoIdentificacion}</p>
        <p><strong>Nacionalidad:</strong> ${juridico.nacionalidad}</p>
        <p><strong>Ciudad Residencia:</strong> ${juridico.ciudadResidencia}</p>
        <p><strong>Dirección:</strong> ${juridico.direccion}</p>
        <p><strong>Correo Electrónico:</strong> ${juridico.correoElectronico}</p>
        <p><strong>Teléfono Celular:</strong> ${juridico.telefonoCelular}</p>
        <p><strong>Origen de Fondos:</strong> ${juridico.descripcionOrigenFondos}</p>
        <p><strong>Foto CC:</strong> <a href="${juridico.ccPhotoUrl}" target="_blank" rel="noopener noreferrer">Ver Foto</a></p>
        <p><strong>Foto RUT:</strong> <a href="${juridico.rutPhotoUrl}" target="_blank" rel="noopener noreferrer">Ver Foto</a></p>
        <p><strong>Camara Comercio:</strong> <a href="${juridico.camaraComercioUrl}" target="_blank" rel="noopener noreferrer">Ver Certificado</a></p>
        <p><strong>Cédula Representante Legal:</strong> <a href="${juridico.cedulaRepresentanteLegalUrl}" target="_blank" rel="noopener noreferrer">Ver Cédula</a></p>
        <p><strong>Estados Financieros:</strong> <a href="${juridico.estadosFinancierosUrl}" target="_blank" rel="noopener noreferrer">Ver Estados Financieros</a></p>
        <p><strong>Certificado Bancario:</strong> <a href="${juridico.certificadoBancarioUrl}" target="_blank" rel="noopener noreferrer">Ver Certificado</a></p>
        <p><strong>Composición Accionaria:</strong> <a href="${juridico.composicionAccionariaUrl}" target="_blank" rel="noopener noreferrer">Ver Composición</a></p>
      `,
      confirmButtonText: 'Cerrar',
       showCancelButton: true,
      cancelButtonText: 'Auditar'
    }).then((result)=>{
      if(result.dismiss === Swal.DismissReason.cancel){
       console.log('Datos a Enviar --Juridicos:', juridico)

       fetch('http://localhost:3000/api/auditoria-juridicos', {
        method: 'POST',
        headers:{
          'Content-Type' :  'application/json'
        },
        body: JSON.stringify(juridico)
       })
       .then(response=>response.json())
       .then(data =>{
        console.log('Exito', data)
       })
       .catch((error)=>{
        console.error('Error, error')
       })
      }
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KYC Juridicos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombres Completos</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((juridico) => (
            <tr key={juridico.id} onClick={() => showAlert(juridico)}>
              <td className={styles.nameCell}>
                {juridico.nombresCompletos}
                <FaInfoCircle className={styles.icon} />
                {searchTerm && (
                  <div className={styles.highlight}>
                    {Object.entries(juridico).map(([key, value]) =>
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

export default Juridicos;

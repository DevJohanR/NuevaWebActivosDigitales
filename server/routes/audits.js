const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');


/*
//
Rutas Personas
//
*/




// Ruta para manejar la inserción de datos en la tabla audit_personas
router.post('/auditoria-personas', async (req, res) => {
  const persona = req.body;
  console.log('Datos recibidos en el Backend:', persona);

  try {
    const [result] = await pool.query(
      'INSERT INTO audit_personas (nombresCompletos, numeroIdentificacion, tipoIdentificacion, nacionalidad, ciudadResidencia, direccion, correoElectronico, telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        persona.nombresCompletos,
        persona.numeroIdentificacion,
        persona.tipoIdentificacion,
        persona.nacionalidad,
        persona.ciudadResidencia,
        persona.direccion,
        persona.correoElectronico,
        persona.telefonoCelular,
        persona.descripcionOrigenFondos,
        persona.ccPhotoUrl,
        persona.rutPhotoUrl
      ]
    );
    console.log('Resultado de la inserción:', result);
    res.status(200).json({ message: 'Datos recibidos con éxito y guardados en la tabla de auditoría', data: result });
  } catch (error) {
    console.error('Error al guardar los datos en la tabla de auditoría:', error);
    res.status(500).json({ message: 'Error al guardar los datos en la tabla de auditoría', error });
  }
});

// Ruta para ver las personas auditadas
router.get('/auditoria-personas', async (req,res)=>{
  try{
    const [rows] = await pool.query('SELECT * FROM audit_personas');
    res.status(200).json(rows);
  }catch(error){
    console.error('Error al obtener los datos de la tabla de auditoría:', error);
    res.status(500).json({message: 'Error al obtener los datos de la tabla de auditoría', error })
  }
})

router.put('/verificar-persona/:id', async (req, res) => {
  const personaId = req.params.id;
  const verificacion = req.body;

  try {
    // Obtener los valores actuales de la persona
    const [currentData] = await pool.query('SELECT * FROM audit_personas WHERE id = ?', [personaId]);
    const current = currentData[0];

    // Actualizar solo los campos proporcionados
    const updatedData = {
      verificarNombresCompletos: verificacion.verificarNombresCompletos !== undefined ? verificacion.verificarNombresCompletos : current.verificarNombresCompletos,
      verificarNumeroIdentificacion: verificacion.verificarNumeroIdentificacion !== undefined ? verificacion.verificarNumeroIdentificacion : current.verificarNumeroIdentificacion,
      verificarTipoIdentificacion: verificacion.verificarTipoIdentificacion !== undefined ? verificacion.verificarTipoIdentificacion : current.verificarTipoIdentificacion,
      verificarNacionalidad: verificacion.verificarNacionalidad !== undefined ? verificacion.verificarNacionalidad : current.verificarNacionalidad,
      verificarCiudadResidencia: verificacion.verificarCiudadResidencia !== undefined ? verificacion.verificarCiudadResidencia : current.verificarCiudadResidencia,
      verificarDireccion: verificacion.verificarDireccion !== undefined ? verificacion.verificarDireccion : current.verificarDireccion,
      verificarCorreoElectronico: verificacion.verificarCorreoElectronico !== undefined ? verificacion.verificarCorreoElectronico : current.verificarCorreoElectronico,
      verificarTelefonoCelular: verificacion.verificarTelefonoCelular !== undefined ? verificacion.verificarTelefonoCelular : current.verificarTelefonoCelular,
      verificarDescripcionOrigenFondos: verificacion.verificarDescripcionOrigenFondos !== undefined ? verificacion.verificarDescripcionOrigenFondos : current.verificarDescripcionOrigenFondos,
      verificarCcPhotoUrl: verificacion.verificarCcPhotoUrl !== undefined ? verificacion.verificarCcPhotoUrl : current.verificarCcPhotoUrl,
      verificarRutPhotoUrl: verificacion.verificarRutPhotoUrl !== undefined ? verificacion.verificarRutPhotoUrl : current.verificarRutPhotoUrl,
    };

    const [result] = await pool.query(
      'UPDATE audit_personas SET verificarNombresCompletos = ?, verificarNumeroIdentificacion = ?, verificarTipoIdentificacion = ?, verificarNacionalidad = ?, verificarCiudadResidencia = ?, verificarDireccion = ?, verificarCorreoElectronico = ?, verificarTelefonoCelular = ?, verificarDescripcionOrigenFondos = ?, verificarCcPhotoUrl = ?, verificarRutPhotoUrl = ? WHERE id = ?',
      [
        updatedData.verificarNombresCompletos,
        updatedData.verificarNumeroIdentificacion,
        updatedData.verificarTipoIdentificacion,
        updatedData.verificarNacionalidad,
        updatedData.verificarCiudadResidencia,
        updatedData.verificarDireccion,
        updatedData.verificarCorreoElectronico,
        updatedData.verificarTelefonoCelular,
        updatedData.verificarDescripcionOrigenFondos,
        updatedData.verificarCcPhotoUrl,
        updatedData.verificarRutPhotoUrl,
        personaId
      ]
    );

    res.status(200).json({ message: 'Campos de verificación actualizados con éxito', data: result });
  } catch (error) {
    console.error('Error al actualizar los campos de verificación:', error);
    res.status(500).json({ message: 'Error al actualizar los campos de verificación', error });
  }
});


/*
//
Rutas Juridicos
//
*/

router.post('/auditoria-juridicos', async (req, res)=>{
  const juridico = req.body;
  console.log('Datos para Juridicos --Recibidos:', juridico);

  try{
    const [result] = await pool.query(
      `INSERT INTO audit_juridicos(nombresCompletos, numeroIdentificacion, tipoIdentificacion, nacionalidad, ciudadResidencia, direccion, correoElectronico, telefonoCelular, descripcionOrigenFondos, ccPhotoUrl, rutPhotoUrl, camaraComercioUrl, cedulaRepresentanteLegalUrl, estadosFinancierosUrl, certificadoBancarioUrl, composicionAccionariaUrl) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `,
      [
        juridico.nombresCompletos,
        juridico.numeroIdentificacion,
        juridico.tipoIdentificacion,
        juridico.nacionalidad,
        juridico.ciudadResidencia,
        juridico.direccion,
        juridico.correoElectronico,
        juridico.telefonoCelular,
        juridico.descripcionOrigenFondos,
        juridico.ccPhotoUrl,
        juridico.rutPhotoUrl,
        juridico.camaraComercioUrl,
        juridico.cedulaRepresentanteLegalUrl,
        juridico.estadosFinancierosUrl,
        juridico.certificadoBancarioUrl,
        juridico.composicionAccionariaUrl
      ]
    );
    console.log('Resultado de la insercion:', result);
    res.status(200).json({message: 'Datos recibidos con exito y guardados en la tabla de auditoria', data:result});
  }catch(error){
console.error('Error al guardar los datos en la tabla auditoria', error);
res.status(500).json({ message: 'Error al guardar los datos en la tabla de auditoría', error });
  }
  

})





router.put('/verificar-juridico/:id', async (req, res) => {
  const juridicoId = req.params.id;
  const verificacion = req.body;

  try {
    // Obtener los valores actuales del jurídico
    const [currentData] = await pool.query('SELECT * FROM audit_juridicos WHERE id = ?', [juridicoId]);
    const current = currentData[0];

    // Actualizar solo los campos proporcionados
    const updatedData = {
      verificarNombresCompletos: verificacion.verificarNombresCompletos !== undefined ? verificacion.verificarNombresCompletos : current.verificarNombresCompletos,
      verificarNumeroIdentificacion: verificacion.verificarNumeroIdentificacion !== undefined ? verificacion.verificarNumeroIdentificacion : current.verificarNumeroIdentificacion,
      verificarTipoIdentificacion: verificacion.verificarTipoIdentificacion !== undefined ? verificacion.verificarTipoIdentificacion : current.verificarTipoIdentificacion,
      verificarNacionalidad: verificacion.verificarNacionalidad !== undefined ? verificacion.verificarNacionalidad : current.verificarNacionalidad,
      verificarCiudadResidencia: verificacion.verificarCiudadResidencia !== undefined ? verificacion.verificarCiudadResidencia : current.verificarCiudadResidencia,
      verificarDireccion: verificacion.verificarDireccion !== undefined ? verificacion.verificarDireccion : current.verificarDireccion,
      verificarCorreoElectronico: verificacion.verificarCorreoElectronico !== undefined ? verificacion.verificarCorreoElectronico : current.verificarCorreoElectronico,
      verificarTelefonoCelular: verificacion.verificarTelefonoCelular !== undefined ? verificacion.verificarTelefonoCelular : current.verificarTelefonoCelular,
      verificarDescripcionOrigenFondos: verificacion.verificarDescripcionOrigenFondos !== undefined ? verificacion.verificarDescripcionOrigenFondos : current.verificarDescripcionOrigenFondos,
      verificarCcPhotoUrl: verificacion.verificarCcPhotoUrl !== undefined ? verificacion.verificarCcPhotoUrl : current.verificarCcPhotoUrl,
      verificarRutPhotoUrl: verificacion.verificarRutPhotoUrl !== undefined ? verificacion.verificarRutPhotoUrl : current.verificarRutPhotoUrl,
      verificarCamaraComercioUrl: verificacion.verificarCamaraComercioUrl !== undefined ? verificacion.verificarCamaraComercioUrl : current.verificarCamaraComercioUrl,
      verificarCedulaRepresentanteLegalUrl: verificacion.verificarCedulaRepresentanteLegalUrl !== undefined ? verificacion.verificarCedulaRepresentanteLegalUrl : current.verificarCedulaRepresentanteLegalUrl,
      verificarEstadosFinancierosUrl: verificacion.verificarEstadosFinancierosUrl !== undefined ? verificacion.verificarEstadosFinancierosUrl : current.verificarEstadosFinancierosUrl,
      verificarCertificadoBancarioUrl: verificacion.verificarCertificadoBancarioUrl !== undefined ? verificacion.verificarCertificadoBancarioUrl : current.verificarCertificadoBancarioUrl,
      verificarComposicionAccionariaUrl: verificacion.verificarComposicionAccionariaUrl !== undefined ? verificacion.verificarComposicionAccionariaUrl : current.verificarComposicionAccionariaUrl
    };

    const [result] = await pool.query(
      `UPDATE audit_juridicos SET 
        verificarNombresCompletos = ?, 
        verificarNumeroIdentificacion = ?, 
        verificarTipoIdentificacion = ?, 
        verificarNacionalidad = ?, 
        verificarCiudadResidencia = ?, 
        verificarDireccion = ?, 
        verificarCorreoElectronico = ?, 
        verificarTelefonoCelular = ?, 
        verificarDescripcionOrigenFondos = ?, 
        verificarCcPhotoUrl = ?, 
        verificarRutPhotoUrl = ?, 
        verificarCamaraComercioUrl = ?, 
        verificarCedulaRepresentanteLegalUrl = ?, 
        verificarEstadosFinancierosUrl = ?, 
        verificarCertificadoBancarioUrl = ?, 
        verificarComposicionAccionariaUrl = ? 
      WHERE id = ?`,
      [
        updatedData.verificarNombresCompletos,
        updatedData.verificarNumeroIdentificacion,
        updatedData.verificarTipoIdentificacion,
        updatedData.verificarNacionalidad,
        updatedData.verificarCiudadResidencia,
        updatedData.verificarDireccion,
        updatedData.verificarCorreoElectronico,
        updatedData.verificarTelefonoCelular,
        updatedData.verificarDescripcionOrigenFondos,
        updatedData.verificarCcPhotoUrl,
        updatedData.verificarRutPhotoUrl,
        updatedData.verificarCamaraComercioUrl,
        updatedData.verificarCedulaRepresentanteLegalUrl,
        updatedData.verificarEstadosFinancierosUrl,
        updatedData.verificarCertificadoBancarioUrl,
        updatedData.verificarComposicionAccionariaUrl,
        juridicoId
      ]
    );

    res.status(200).json({ message: 'Campos de verificación actualizados con éxito', data: result });
  } catch (error) {
    console.error('Error al actualizar los campos de verificación:', error);
    res.status(500).json({ message: 'Error al actualizar los campos de verificación', error });
  }
});


router.get('/auditoria-juridicos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM audit_juridicos');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los datos de la tabla de auditoría para jurídicos:', error);
    res.status(500).json({ message: 'Error al obtener los datos de la tabla de auditoría para jurídicos', error });
  }
});




router.put('/rechazar-persona/:id', async (req, res) => {

    console.log(`Received request to reject juridico with ID: ${req.params.id}`);
   
  const { id } = req.params;
  const { causaRechazo } = req.body;

  // Validación básica
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  if (!causaRechazo || typeof causaRechazo !== 'string') {
    return res.status(400).json({ message: 'Causa de rechazo inválida' });
  }

  try {
    // Consulta para actualizar el juridico
    const [result] = await pool.query(
      'UPDATE audit_personas SET rechazado = ?, causaRechazo = ? WHERE id = ?',
      [true, causaRechazo, id]
    );

    // Verificar si el juridico fue encontrado y actualizado
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Rechazo actualizado correctamente.' });
    } else {
      return res.status(404).json({ message: 'Persona jurídica no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado de rechazo:', error);

    // Respuesta más clara en caso de error
    return res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
});

// Ruta para manejar el rechazo de una entidad jurídica
router.put('/rechazar-juridico/:id', async (req, res) => {
  console.log(`Received request to reject juridico with ID: ${req.params.id}`);
  
  const { id } = req.params;
  const { causaRechazo } = req.body;

  // Validación básica
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  if (!causaRechazo || typeof causaRechazo !== 'string') {
    return res.status(400).json({ message: 'Causa de rechazo inválida' });
  }

  try {
    // Consulta para actualizar el estado de rechazo
    const [result] = await pool.query(
      'UPDATE audit_juridicos SET rechazado = ?, causaRechazo = ? WHERE id = ?',
      [true, causaRechazo, id]
    );

    // Verificar si la entidad jurídica fue encontrada y actualizada
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Rechazo actualizado correctamente.' });
    } else {
      return res.status(404).json({ message: 'Entidad jurídica no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar el estado de rechazo:', error);

    // Respuesta más clara en caso de error
    return res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
});




module.exports = router;

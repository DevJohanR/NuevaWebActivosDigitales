const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');


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






module.exports = router;

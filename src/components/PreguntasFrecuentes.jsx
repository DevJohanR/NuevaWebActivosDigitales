import React, {useEffect,useState} from 'react'
import "./PreguntasFrecuentes.css"

const PreguntasFrecuentes = () => {

    const [preguntas, setPreguntas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const url = "https://miniapi-6flu.onrender.com/preguntas";
        
        fetch(url)
        .then(response =>{
            //verificar si la respuesta es exitosa
            if(!response.ok){
                throw new Error ('La solicitud a la API de Activos Digitales ha fallado');
            }
            return response.json();
        })
        .then(data =>{
            setPreguntas(data);
        })
        .catch(error=>{
            setError(error.message);
            console.error('Error al obtener los datos de la API de Activos Digitales: ', error)
        });

    }, []);

  return (
    <div className='preguntasFrecuentes' style={{"color": "white", "marginTop": "150px", "height": "100vh"}} >
        
        <div>
        <h1>PREGUNTAS FRECUENTES</h1>
        </div>
    
<div>
    {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='renderPreguntas'>
          {preguntas.length > 0 ? (
            <pre>{JSON.stringify(preguntas, null, 2)}</pre>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      )}

</div>
    </div>
  )
}

export default PreguntasFrecuentes
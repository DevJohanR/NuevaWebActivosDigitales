import React, { useEffect, useState } from 'react';
import "./PreguntasFrecuentesPersonalizadas.css";

const PreguntasFrecuentesPersonalizadas = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = "https://miniapi-6flu.onrender.com/preguntas";
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud a la API de Activos Digitales ha fallado');
                }
                return response.json();
            })
            .then(data => {
                setPreguntas(data);
            })
            .catch(error => {
                setError(error.message);
                console.error('Error al obtener los datos de la API de Activos Digitales: ', error);
            });
    }, []);

    const resaltarTexto = (texto) => {
        const partes = texto.split(/(activos digitales|\?|¿)/gi);
        return partes.map((parte, index) => {
            if (parte.toLowerCase() === 'activos digitales') {
                return <span key={index} className="resaltadoPersonalizada">{parte}</span>;
            } else if (parte === '?' || parte === '¿') {
                return <span key={index} className="signoInterrogacionPersonalizada">{parte}</span>;
            } else {
                return parte;
            }
        });
    };

    return (
        <div className='preguntasFrecuentesPersonalizada' style={{ color: "white", marginTop: "150px", height: "100vh" }}>
            <div>
                <h1>PREGUNTAS FRECUENTES</h1>
            </div>
            <div>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className='renderPreguntasPrincipal'>
                        {preguntas.length > 0 ? (
                            preguntas.map((p, index) => {
                                const preguntaClass = `pregunta-${index}CSS`;
                                const respuestaClass = `respuesta-${index}CSS`;
                                return (
                                    <div key={p.id} className={`cardPreguntasFrecuentesPersonalizada ${preguntaClass}`}>
                                        <div className={`preguntaPersonalizada ${preguntaClass}`}>
                                            {resaltarTexto(p.pregunta)}
                                        </div>
                                        <div className={`respuestaPersonalizada ${respuestaClass}`}>
                                            {typeof p.respuesta === 'string' ? resaltarTexto(p.respuesta) : resaltarTexto(JSON.stringify(p.respuesta, null, 2))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreguntasFrecuentesPersonalizadas;

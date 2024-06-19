import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "./PreguntasFrecuentesPersonalizadas.css";

const PreguntasFrecuentesPersonalizadas = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const url = "https://auditoriaactivosdigitalesbackend-pybg.onrender.com/preguntas";

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            document.documentElement.style.setProperty('--dynamic-height', activeIndex !== null ? '120vh' : '60vh');
        } else {
            document.documentElement.style.setProperty('--dynamic-height', activeIndex !== null ? '160vh' : '112vh');
        }
    }, [activeIndex, isMobile]);

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

    const renderRespuesta = (respuesta) => {
        if (typeof respuesta === 'string') {
            return resaltarTexto(respuesta);
        } else if (typeof respuesta === 'object') {
            return (
                <ul>
                    {Object.entries(respuesta).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                        </li>
                    ))}
                </ul>
            );
        }
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='preguntasFrecuentesPersonalizada' style={{ color: "white", marginTop: "200px", height: "var(--dynamic-height)" }}>
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
                                const isActive = activeIndex === index;
                                return (
                                    <div key={p.id} className={`cardPreguntasFrecuentesPersonalizada ${preguntaClass}`}>
                                        <div className={`preguntaPersonalizada ${preguntaClass}`} onClick={() => toggleAccordion(index)}>
                                            <div className="preguntaTexto">{resaltarTexto(p.pregunta)}</div>
                                            <span className="icon">
                                                {isActive ? <FaChevronUp /> : <FaChevronDown />}
                                            </span>
                                        </div>
                                        {isActive && (
                                            <div className={`respuestaPersonalizada ${respuestaClass}`}>
                                                {renderRespuesta(p.respuesta)}
                                            </div>
                                        )}
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

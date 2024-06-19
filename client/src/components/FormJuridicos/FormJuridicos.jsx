import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload } from 'react-icons/fa';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import styles from './FormJuridicos.module.css';
import modalStyles from './Modal.module.css';

Modal.setAppElement('#root');

const FormJuridicos = () => {
    const [post, setPost] = useState({
        nombresCompletos: '',
        numeroIdentificacion: '',
        tipoIdentificacion: '',
        nacionalidad: '',
        ciudadResidencia: '',
        direccion: '',
        correoElectronico: '',
        telefonoCelular: '',
        descripcionOrigenFondos: '',
        ccPhoto: null,
        rutPhoto: null,
        camaraComercio: null,
        cedulaRepresentanteLegal: null,
        estadosFinancieros: null,
        certificadoBancario: null,
        composicionAccionaria: null,
    });

    const [imageUrls, setImageUrls] = useState({
        ccPhotoUrl: '',
        rutPhotoUrl: '',
        camaraComercioUrl: '',
        cedulaRepresentanteLegalUrl: '',
        estadosFinancierosUrl: '',
        certificadoBancarioUrl: '',
        composicionAccionariaUrl: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);


    const [cities, setCities] = useState([]);
    const [language, setLanguage] = useState('es');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [acceptPolicies, setAcceptPolicies] = useState({
        personalData: false,
        fundsDeclaration: false,
        riskManagement: false
    });

    useEffect(() => {
        axios.get('https://api-colombia.com/api/v1/City')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error al cargar ciudades:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true); // Activar estado de procesamiento
    
        const formData = new FormData();
        for (const key in post) {
            if (post[key]) {
                formData.append(key, post[key]);
            }
        }
    
        try {
            const uploadResponse = await axios.post('https://nuevawebactivosdigitales.onrender.com/upload-juridicos', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            const {
                ccPhotoUrl,
                rutPhotoUrl,
                camaraComercioUrl,
                cedulaRepresentanteLegalUrl,
                estadosFinancierosUrl,
                certificadoBancarioUrl,
                composicionAccionariaUrl
            } = uploadResponse.data;
    
            setImageUrls({
                ccPhotoUrl,
                rutPhotoUrl,
                camaraComercioUrl,
                cedulaRepresentanteLegalUrl,
                estadosFinancierosUrl,
                certificadoBancarioUrl,
                composicionAccionariaUrl
            });
    
            localStorage.setItem('formDataJuridicos', JSON.stringify(post));
            localStorage.setItem('imageUrlsJuridicos', JSON.stringify({
                ccPhotoUrl,
                rutPhotoUrl,
                camaraComercioUrl,
                cedulaRepresentanteLegalUrl,
                estadosFinancierosUrl,
                certificadoBancarioUrl,
                composicionAccionariaUrl
            }));
    
            Swal.fire({
                title: '¿Haz diligenciado tus datos correctamente?',
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    setModalIsOpen(true);
                }
            });
    
        } catch (error) {
            console.error('Error uploading files:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al subir las imágenes.',
            });
        } finally {
            setIsProcessing(false); // Desactivar estado de procesamiento
        }
    };
    

    const handleModalSubmit = async () => {
        if (Object.values(acceptPolicies).every(Boolean)) {
            const storedFormData = JSON.parse(localStorage.getItem('formDataJuridicos'));
            const storedImageUrls = JSON.parse(localStorage.getItem('imageUrlsJuridicos'));

            const finalData = {
                ...storedFormData,
                ...storedImageUrls
            };

            try {
                const saveResponse = await axios.post('https://nuevawebactivosdigitales.onrender.com/save-juridicos', finalData);
                console.log(saveResponse.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Datos guardados correctamente.',
                });

            } catch (error) {
                console.error('Error saving data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al guardar los datos.',
                });
            } finally {
                setModalIsOpen(false);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, acepte todas las políticas antes de enviar.',
            });
        }
    };

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setPost(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleFileClick = (field) => {
        document.getElementById(field).click();
    };

    const toggleLanguage = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del botón dentro de un formulario
        setLanguage(prevLanguage => prevLanguage === 'es' ? 'en' : 'es');
    };

    const translations = {
        es: {
            title: 'KyC - Vinculación PERSONA JURIDICA - ACTIVOS DIGITALES S.A.S. PSAV',
            nombresCompletos: 'Nombres Completos',
            numeroIdentificacion: 'Numero de Identificación',
            tipoIdentificacion: 'Seleccione tipo de identificación',
            nacionalidad: 'Nacionalidad',
            ciudadResidencia: 'Seleccione una ciudad',
            direccion: 'Dirección',
            correoElectronico: 'Correo Electronico',
            telefonoCelular: 'Teléfono celular',
            descripcionOrigenFondos: 'Origen de tus fondos',
            ccPhoto: 'CC',
            rutPhoto: 'RUT',
            camaraComercio: 'CAMARA DE COMERCIO',
            cedulaRepresentanteLegal: 'CC REPRESENTANTE LEGAL',
            estadosFinancieros: 'ESTADOS FINANCIEROS',
            certificadoBancario: 'CERTIFICADO BANCARIO',
            composicionAccionaria: 'COMPOSICION ACCIONARIA',
            enviar: 'Enviar',
            selectFile: 'Seleccionar archivo',
            noFileSelected: 'Sin archivos seleccionados',
            accept: 'Aceptar',
            decline: 'No acepto',
            policies: {
                personalData: '¿Autoriza usted el tratamiento de sus datos personales?',
                fundsDeclaration: 'Declaro expresamente que...',
                riskManagement: '¿Está usted de acuerdo con la Política arriba mencionada?',
            },
            options: {
                tipoIdentificacion: [
                    { value: 'cc', label: 'Cédula de ciudadanía' },
                    { value: 'ce', label: 'Cédula de extranjería' },
                    { value: 'pasaporte', label: 'Pasaporte' },
                    { value: 'pep', label: 'Permiso especial de permanencia (PEP)' },
                    { value: 'ppt', label: 'Permiso por protección temporal' },
                    { value: 'otro', label: 'Otro' },
                ]
            }
        },
        en: {
            title: 'KyC - LEGAL PERSON Linkage - ACTIVOS DIGITALES S.A.S. PSAV',
            nombresCompletos: 'Full Names',
            numeroIdentificacion: 'Identification Number',
            tipoIdentificacion: 'Select type of identification',
            nacionalidad: 'Nationality',
            ciudadResidencia: 'Select a city',
            direccion: 'Address',
            correoElectronico: 'Email',
            telefonoCelular: 'Cellphone',
            descripcionOrigenFondos: 'Source of your funds',
            ccPhoto: 'ID',
            rutPhoto: 'TAX ID',
            camaraComercio: 'Chamber of Commerce',
            cedulaRepresentanteLegal: 'Legal Representative ID',
            estadosFinancieros: 'Financial Statements',
            certificadoBancario: 'Bank Certificate',
            composicionAccionaria: 'Shareholding Composition',
            enviar: 'Submit',
            selectFile: 'Select file',
            noFileSelected: 'No files selected',
            accept: 'Accept',
            decline: 'Do not accept',
            policies: {
                personalData: 'Do you authorize the processing of your personal data?',
                fundsDeclaration: 'I expressly declare that...',
                riskManagement: 'Do you agree with the above-mentioned Policy?',
            },
            options: {
                tipoIdentificacion: [
                    { value: 'cc', label: 'Citizenship ID' },
                    { value: 'ce', label: 'Foreigner ID' },
                    { value: 'pasaporte', label: 'Passport' },
                    { value: 'pep', label: 'Special Stay Permit (PEP)' },
                    { value: 'ppt', label: 'Temporary Protection Permit' },
                    { value: 'otro', label: 'Other' },
                ]
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.containerPersonas}>
                {/* Contenedor para el cambio de idioma */}
                <div className={styles.idiomas}>
                    <h1>{translations[language].title}</h1>
                    {/* Cambié el tipo de botón a "button" y añadí e.preventDefault() en la función toggleLanguage */}
                    <button type="button" onClick={toggleLanguage}>
                        {language === 'es' ? 'Switch to: English' : 'Cambiar a: Español'}
                    </button>
                </div>
                <input
                    type="text"
                    placeholder={translations[language].nombresCompletos}
                    name="nombresCompletos"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder={translations[language].numeroIdentificacion}
                    name='numeroIdentificacion'
                    onChange={handleChange}
                />
                <select name="tipoIdentificacion" id="tipoIdentificacion" onChange={handleChange}>
                    <option value="">{translations[language].tipoIdentificacion}</option>
                    {translations[language].options.tipoIdentificacion.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={translations[language].nacionalidad}
                    name='nacionalidad'
                    onChange={handleChange}
                />
                <select name="ciudadResidencia" id="ciudadResidencia" onChange={handleChange}>
                    <option value="">{translations[language].ciudadResidencia}</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder={translations[language].direccion}
                    name='direccion'
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder={translations[language].correoElectronico}
                    name='correoElectronico'
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder={translations[language].telefonoCelular}
                    name='telefonoCelular'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder={translations[language].descripcionOrigenFondos}
                    name='descripcionOrigenFondos'
                    onChange={handleChange}
                />

                <div className={styles.uploads}>
                    {['ccPhoto', 'rutPhoto', 'camaraComercio', 'cedulaRepresentanteLegal', 'estadosFinancieros', 'certificadoBancario', 'composicionAccionaria'].map(field => (
                        <div key={field} className={styles.uploadField}>
                            <label htmlFor={field}>{translations[language][field]}</label>
                            <button type="button" onClick={() => handleFileClick(field)} className={styles.customFileUpload}>
                                <FaFileUpload /> {translations[language].selectFile}
                            </button>
                            <input
                                type="file"
                                name={field}
                                id={field}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <span className={styles.fileName}>
                                {post[field] ? post[field].name : translations[language].noFileSelected}
                            </span>
                        </div>
                    ))}
                </div>

                <button type="submit" className={styles.btnSend} disabled={isProcessing}>
    {isProcessing ? 'Procesando...' : translations[language].enviar}
</button>

            </form>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className={modalStyles.modalContainer}  style={{
        content: {
            marginTop: "70px", /* Ajusta este valor según sea necesario */
            maxHeight: "70vh", /* Máxima altura del contenido del modal */
            overflowY: "auto" /* Habilita el scroll vertical */
        }
    }}>
                <div className={modalStyles.modalHeader}>
                    <h2 className={modalStyles.modalTitle}>{language === 'es' ? 'Políticas de Tratamiento de Datos' : 'Data Processing Policies'}</h2>
                    <button className={modalStyles.closeButton} onClick={() => setModalIsOpen(false)}>&times;</button>
                </div>
                <div className={modalStyles.modalContent}>
                    <p>A. 12. {language === 'es' ? 'Ley de tratamiento de datos personales' : 'Personal data processing law'}:</p>
                    <p>{language === 'es' ? 'De conformidad con lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377 de 2013, se desarrolla el principio constitucional que tienen todas las personas a conocer, actualizar, rectificar o suprimir la información que haya sido recolectada, almacenada y usada o que haya sido objeto de tratamiento de datos personales en bancos, en bases de datos y en general en archivos de entidades públicas y privadas. ACTIVOS DIGITALES S.A.S., solicita a sus clientes, proveedores, afiliados, terceras partes involucradas, autorización para que de manera libre , previa, expresa, voluntaria e informada permita recolectar, almacenar, usar, suprimir, actualizar, procesar, recopilar, intercambiar, dar tratamiento y disponer de los datos que han sido suministrados y que se han incorporado en distintas bases de datos de la compañía. Los datos personales serán utilizados con propósito de llevar a cabo comunicaciones por call center, sistema de llamada automática de voz, mensajes de texto, correo electrónico, medios audiovisuales, tales como carteleras, fax, telegrama, correo certificado, pagina web, o cualquier otro dispositivo que llegue a estar disponible, igualmente dichas comunicaciones podrán ser con fines de verificación de datos, cobro de cartera, información sobre nuestros servicios, ofertas, promociones, eventos, realización de actividades de fidelización, encuestas para identificarlo y en general para que exista una comunicación mas eficiente Según las políticas de tratamiento de datos personales, los mecanismos a través de los cuales hacemos uso de sus datos personales son seguros y confiables, pues contamos medios tecnológicos idóneos que garantizan su confidencialidad como titular de sus datos personales usted tiene la facultad de ejercer los derechos que asisten tales como conocer, actualizar, rectificar o suprimir sus datos personales. En los  términos dispuestos por el Articulo 10 del Decreto 1377 de 2013 queda autorizada de manera expresa e inequívoca para mantener y manejar toda su información, a no ser que usted manifieste lo contrario de manera directa, expresa, inequívoca y por escrito dentro de los treinta (30) días hábiles contados a partir de la publicación o recepción de la presente comunicación a la cuenta de correo electrónico dispuesta para tal efecto: cumplimientoactivosdigitales@gmail.com. En el evento en que usted considere que ACTIVOS DIGITALES S.A.S., dio un uso contrario a lo autorizado y a las leyes aplicables, podrá contactarnos a través de una comunicación motivada dirigida al correo: cumplimientoactivosdigitales@gmail.com' : 'In accordance with the provisions of Law 1581 of 2012 and Decree 1377 of 2013, the constitutional principle that all individuals have the right to know, update, rectify, or delete the information that has been collected, stored, and used, or that has been subject to the processing of personal data in banks, databases, and generally in files of public and private entities is developed. ACTIVOS DIGITALES S.A.S. requests authorization from its clients, suppliers, affiliates, and third parties involved to freely, priorly, expressly, voluntarily, and informatively allow the collection, storage, use, deletion, updating, processing, collection, exchange, treatment, and disposal of the data that have been provided and incorporated into various company databases. Personal data will be used for the purpose of carrying out communications through call centers, automatic voice call systems, text messages, email, audiovisual media such as bulletin boards, fax, telegram, certified mail, web page, or any other device that becomes available. These communications may also be for the purposes of data verification, portfolio collection, information about our services, offers, promotions, events, loyalty activities, surveys to identify you, and generally to ensure more efficient communication. According to personal data processing policies, the mechanisms through which we use your personal data are secure and reliable, as we have suitable technological means that ensure its confidentiality. As the owner of your personal data, you have the right to exercise rights such as knowing, updating, rectifying, or deleting your personal data. Under the terms provided by Article 10 of Decree 1377 of 2013, it is expressly and unequivocally authorized to maintain and manage all your information, unless you expressly and unequivocally state otherwise in writing within thirty (30) business days from the publication or receipt of this communication to the email account provided for this purpose: fulfillmenttrabajosdigitales@gmail.com. In the event that you consider that ACTIVOS DIGITALES S.A.S. has made unauthorized use of your data contrary to applicable laws, you can contact us through a motivated communication addressed to the email: fulfillmenttrabajosdigitales@gmail.com.'}</p>
                   

                    <p>{language === 'es' ? '¿Autoriza usted el tratamiento de sus datos personales?' : 'Do you authorize the processing of your personal data?'}</p>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={acceptPolicies.personalData}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, personalData: !prev.personalData }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'Sí autorizo' : 'I authorize'}</label>
                    </div>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={!acceptPolicies.personalData}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, personalData: !prev.personalData }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'No autorizo' : 'I do not authorize'}</label>
                    </div>

                    <p>B. 15. {language === 'es' ? 'Declaración de origen de fondos' : 'Declaration of Origin of Funds'}:</p>
                    <p>{language === 'es' ? 'Declaro expresamente que: Mi actividad, profesión u oficio es lícita y se ejerce dentro del marco legal y los recursos de la misma no provienen de actividades ilícitas de las contempladas en el Código Penal Colombiano. La información suministrada en este documento es veraz y verificable y me compromete a actualizarla anualmente. Los recursos que se deriven del desarrollo de este contrato no se destinaran a la financiación del terrorismo, grupos terroristas o actividades terroristas. Los recursos que poseo no provienen de las actividades descritas anteriormente.' : 'I expressly declare that: I expressly declare that: My activity, profession, or occupation is lawful and is carried out within the legal framework, and its resources do not come from illicit activities as contemplated in the Colombian Penal Code. The information provided in this document is truthful and verifiable, and I commit to updating it annually. The resources derived from the development of this contract will not be used for the financing of terrorism, terrorist groups, or terrorist activities. The resources I possess do not come from the activities described above. '}</p>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={acceptPolicies.fundsDeclaration}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, fundsDeclaration: !prev.fundsDeclaration }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'Sí acepto' : 'I accept'}</label>
                    </div>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={!acceptPolicies.fundsDeclaration}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, fundsDeclaration: !prev.fundsDeclaration }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'No acepto' : 'I do not accept'}</label>
                    </div>

                    <p>C. 2. {language === 'es' ? 'Política de gestión de riesgos LA/FT' : 'Risk Management Policy'}:</p>
                    <p>{language === 'es' ? 'EL PROVEEDOR y/o CLIENTE se obliga a cumplir con la política de prevención y control del riesgo de lavado de activos y financiación del terrorismo adoptada por ACTIVOS DIGITALES S.A.S., así como las normas y estándares internacionales que regulan la materia. En caso de tener conocimiento de una operación intentada o sospechosa, ACTIVOS DIGITALES S.A.S., lo reportará de forma inmediata a la UIAF (Unidad de información y análisis financiero) y dará por terminada la relación contractual entre las partes, sin que haya lugar al pago de ninguna indemnización a favor de EL PROVEEDOR y/o CLIENTE.' : 'The PROVIDER and/or CLIENT is obligated to comply with the policy of prevention and control of money laundering and terrorist financing risk adopted by ACTIVOS DIGITALES S.A.S., as well as the international regulations and standards governing the matter. In the event of becoming aware of an attempted or suspicious operation, ACTIVOS DIGITALES S.A.S. will immediately report it to the UIAF (Financial Information and Analysis Unit) and will terminate the contractual relationship between the parties without any compensation being payable to the PROVIDER and/or CLIENT.'}</p>
                    <p>{language === 'es' ? '¿Está usted de acuerdo con la Política arriba mencionada?' : 'Do you agree with the above-mentioned Policy?'}</p>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={acceptPolicies.riskManagement}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, riskManagement: !prev.riskManagement }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'Sí estoy de acuerdo' : 'I agree'}</label>
                    </div>
                    <div className={modalStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={!acceptPolicies.riskManagement}
                            onChange={() => setAcceptPolicies(prev => ({ ...prev, riskManagement: !prev.riskManagement }))}
                        />
                        <label className={modalStyles.checkboxLabel}>{language === 'es' ? 'No estoy de acuerdo' : 'I do not agree'}</label>
                    </div>
                </div>
                <div>
                    <button className={`${modalStyles.button} ${modalStyles.acceptButton}`} onClick={handleModalSubmit}>
                        {translations[language].enviar}
                    </button>
                    <button className={`${modalStyles.button} ${modalStyles.cancelButton}`} onClick={() => setModalIsOpen(false)}>
                        {language === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default FormJuridicos;

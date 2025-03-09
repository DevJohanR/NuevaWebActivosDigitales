import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload } from 'react-icons/fa';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import styles from './FormPersonas.module.css';
import modalStyles from './Modal.module.css';

Modal.setAppElement('#root');

const FormPersonas = () => {
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
        ccPhotoPersonas: null,
        rutPhotoPersonas: null,
    });

    const [imageUrls, setImageUrls] = useState({
        ccPhotoUrl: '',
        rutPhotoUrl: ''
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
        setIsProcessing(true);
    
        const formData = new FormData();
        for (const key in post) {
            if (post[key]) {
                formData.append(key, post[key]);
            }
        }
    
        try {
            const uploadResponse = await axios.post('https://nuevawebactivosdigitales.onrender.com/upload-personas', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            const { ccPhotoUrl, rutPhotoUrl } = uploadResponse.data;
            setImageUrls({ ccPhotoUrl, rutPhotoUrl });
    
            localStorage.setItem('formData', JSON.stringify(post));
            localStorage.setItem('imageUrls', JSON.stringify({ ccPhotoUrl, rutPhotoUrl }));
    
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
            setIsProcessing(false);
        }
    };
    

    const handleModalSubmit = async () => {
        if (Object.values(acceptPolicies).every(Boolean)) {
            const storedFormData = JSON.parse(localStorage.getItem('formData'));
            const storedImageUrls = JSON.parse(localStorage.getItem('imageUrls'));

            const finalData = {
                ...storedFormData,
                ccPhotoUrl: storedImageUrls.ccPhotoUrl,
                rutPhotoUrl: storedImageUrls.rutPhotoUrl
            };

            try {
                const saveResponse = await axios.post('https://nuevawebactivosdigitales.onrender.com/save-personas', finalData);
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
        const { name, type, files } = e.target;
        const file = files ? files[0] : null;
    
        setPost(prevState => ({
            ...prevState,
            [name]: type === 'file' ? file : e.target.value
        }));
    
        if (file) {
            Swal.fire({
                icon: 'success',
                title: 'Archivo seleccionado',
                text: `Has seleccionado: ${file.name}`,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    };
    

    const handleFileClick = (field) => {
        document.getElementById(field).click();
    };

    const toggleLanguage = () => {
        setLanguage(prevLanguage => prevLanguage === 'es' ? 'en' : 'es');
    };

    const translations = {
        es: {
            title: 'KyC - Vinculación PERSONA NATURAL - ACTIVOS DIGITALES S.A.S. PSAV',
            nombresCompletos: 'Nombres Completos',
            numeroIdentificacion: 'Numero de Identificación',
            tipoIdentificacion: 'Seleccione tipo de identificación',
            nacionalidad: 'Nacionalidad',
            ciudadResidencia: 'Seleccione una ciudad',
            direccion: 'Dirección',
            correoElectronico: 'Correo Electronico',
            telefonoCelular: 'Teléfono celular',
            descripcionOrigenFondos: 'Origen de tus fondos',
            ccPhotoPersonas: 'CC:',
            rutPhotoPersonas: 'RUT: (Opcional)',
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
            title: 'KyC - NATURAL PERSON Linkage - ACTIVOS DIGITALES S.A.S. PSAV',
            nombresCompletos: 'Full Names',
            numeroIdentificacion: 'Identification Number',
            tipoIdentificacion: 'Select type of identification',
            nacionalidad: 'Nationality',
            ciudadResidencia: 'Select a city',
            direccion: 'Address',
            correoElectronico: 'Email',
            telefonoCelular: 'Cellphone',
            descripcionOrigenFondos: 'Source of your funds',
            ccPhotoPersonas: 'ID:',
            rutPhotoPersonas: 'TAX ID: (Optional)',
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
        <div className={styles.containerPersonas}>


            <div className={styles.idiomas}>
            <h1>{translations[language].title}</h1>
            <button onClick={toggleLanguage}>
                {language === 'es' ? 'Switch to: English' : 'Cambiar a: Español'}
            </button>

            </div>

            <form onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder={translations[language].nombresCompletos}
        name="nombresCompletos"
        onChange={handleChange}
    />
    <input
        type="text"
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
        type="text"
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
        {['ccPhotoPersonas', 'rutPhotoPersonas'].map(field => (
            <div key={field} className={styles.uploadField}>
                <label htmlFor={field}>{translations[language][field]}</label>
                {field === 'ccPhotoPersonas' && (
                    <div className={styles.advertencia}>
                        Cargar la <strong>CEDULA DE CIUDADANIA POR AMBOS LADOS</strong> , de lo contrario tendrá que repetir el KYC
                    </div>
                )}
                <button type="button" onClick={() => handleFileClick(field)} className={styles.customFileUpload}>
                    <FaFileUpload /> {translations[language].selectFile}
                </button>
                <input
                    type="file"
                    name={field}
                    id={field}
                    onChange={handleChange}
                    required={field !== 'rutPhotoPersonas'} 
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

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className={modalStyles.modalContainer}     style={{
        content: {
            marginTop: "70px", /* Ajusta este valor según sea necesario */
            maxHeight: "70vh", /* Máxima altura del contenido del modal */
            overflowY: "auto" /* Habilita el scroll vertical */
        }
    }}
>
                <div className={modalStyles.modalHeader}>
                    <h2 className={modalStyles.modalTitle}>{language === 'es' ? 'Políticas de Tratamiento de Datos' : 'Data Processing Policies'}</h2>
                    <button className={modalStyles.closeButton} onClick={() => setModalIsOpen(false)}>&times;</button>
                </div>
                <div className={modalStyles.modalContent}>
                    <p>{language === 'es' ? 'Ley de tratamiento de datos personales' : 'Personal Data Treatment Law'}:</p>
                    <p>{language === 'es' ? 'De conformidad con lo dispuesto en la Ley 1581 de 2012 y el Decreto 1377 de 2013, se desarrolla el principio constitucional que tienen todas las personas a conocer, actualizar, rectificar o suprimir la información que haya sido recolectada, almacenada y usada o que haya sido objeto de tratamiento de datos personales en bancos, en bases de datos y en general en archivos de entidades públicas y privadas. ACTIVOS DIGITALES S.A.S., solicita a sus clientes, proveedores, afiliados, terceras partes involucradas, autorización para que de manera libre , previa, expresa, voluntaria e informada permita recolectar, almacenar, usar, suprimir, actualizar, procesar, recopilar, intercambiar, dar tratamiento y disponer de los datos que han sido suministrados y que se han incorporado en distintas bases de datos de la compañía. Los datos personales serán utilizados con propósito de llevar a cabo comunicaciones por call center, sistema de llamada automática de voz, mensajes de texto, correo electrónico, medios audiovisuales, tales como carteleras, fax, telegrama, correo certificado, pagina web, o cualquier otro dispositivo que llegue a estar disponible, igualmente dichas comunicaciones podrán ser con fines de verificación de datos, cobro de cartera, información sobre nuestros servicios, ofertas, promociones, eventos, realización de actividades de fidelización, encuestas para identificarlo y en general para que exista una comunicación mas eficiente Según las políticas de tratamiento de datos personales, los mecanismos a través de los cuales hacemos uso de sus datos personales son seguros y confiables, pues contamos medios tecnológicos idóneos que garantizan su confidencialidad como titular de sus datos personales usted tiene la facultad de ejercer los derechos que asisten tales como conocer, actualizar, rectificar o suprimir sus datos personales. En los  términos dispuestos por el Articulo 10 del Decreto 1377 de 2013 queda autorizada de manera expresa e inequívoca para mantener y manejar toda su información, a no ser que usted manifieste lo contrario de manera directa, expresa, inequívoca y por escrito dentro de los treinta (30) días hábiles contados a partir de la publicación o recepción de la presente comunicación a la cuenta de correo electrónico dispuesta para tal efecto: cumplimientoactivosdigitales@gmail.com. En el evento en que usted considere que ACTIVOS DIGITALES S.A.S., dio un uso contrario a lo autorizado y a las leyes aplicables, podrá contactarnos a través de una comunicación motivada dirigida al correo: cumplimientoactivosdigitales@gmail.com ' : 'In accordance with the provisions of Law 1581 of 2012 and Decree 1377 of 2013, the constitutional principle is developed that all individuals have the right to know, update, rectify, or delete the information that has been collected, stored, and used, or that has been subject to the processing of personal data in banks, databases, and, in general, in files of public and private entities. ACTIVOS DIGITALES S.A.S. requests authorization from its clients, suppliers, affiliates, and third parties involved to freely, previously, expressly, voluntarily, and informally allow the collection, storage, use, deletion, updating, processing, compilation, exchange, treatment, and disposal of the data that has been provided and incorporated into various company databases. Personal data will be used for the purpose of carrying out communications via call centers, automated voice call systems, text messages, email, audiovisual media such as bulletin boards, fax, telegram, certified mail, website, or any other device that becomes available. These communications may also be for data verification purposes, debt collection, information about our services, offers, promotions, events, loyalty activities, surveys to identify you, and in general, to ensure more efficient communication. According to the personal data processing policies, the mechanisms through which we use your personal data are secure and reliable, as we have suitable technological means that guarantee their confidentiality. As the owner of your personal data, you have the right to know, update, rectify, or delete your personal data. Under the terms provided by Article 10 of Decree 1377 of 2013, authorization is expressly and unequivocally granted to maintain and manage all your information, unless you state otherwise in a direct, express, unequivocal, and written manner within thirty (30) business days from the publication or receipt of this communication to the email account provided for this purpose: cumplimientoactivosdigitales@gmail.com. If you believe that ACTIVOS DIGITALES S.A.S. has used your information in a manner contrary to what was authorized and the applicable laws, you can contact us through a motivated communication addressed to the email: fulfillmenttrabajosdigitales@gmail.com.'}</p>
                    {/* Rest of the policy content */}
                    <p>{language === 'es' ? 'Autoriza usted el tratamiento de sus datos personales?' : 'Do you authorize the processing of your personal data?'}</p>
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

                    <p>{language === 'es' ? 'Declaración de origen de fondos' : 'Declaration of Source of Funds'}:</p>
                    <p>{language === 'es' ? 'Declaro expresamente que: 1. Mi actividad, profesión u oficio es lícita y se ejerce dentro del marco legal y los recursos de la misma no provienen de actividades ilícitas de las contempladas en el Código Penal Colombiano. 2. La información suministrada en este documento es veraz y verificable y me compromete a actualizarla anualmente. 3. Los recursos que se deriven del desarrollo de este contrato no se destinaran a la financiación del terrorismo, grupos terroristas o actividades terroristas. 4. Los recursos que poseo no provienen de las actividades descritas anteriormente.' : 'I expressly declare that:1. My activity, profession, or occupation is lawful and exercised within the legal framework, and its resources do not come from illicit activities contemplated in the Colombian Penal Code. 2. The information provided in this document is true and verifiable, and I commit to updating it annually. 3. The resources derived from the execution of this contract will not be used to finance terrorism, terrorist groups, or terrorist activities. 4. The resources I possess come from the activities described above. '} </p>
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

                    <p>{language === 'es' ? 'Política de gestión de riesgos LA/FT' : 'Risk Management Policy'}:</p>
                    <p>{language === 'es' ? 'EL PROVEEDOR y/o CLIENTE se obliga a cumplir con la política de prevención y control del riesgo de lavado de activos y financiación del terrorismo adoptada por ACTIVOS DIGITALES S.A.S., así como las normas y estándares internacionales que regulan la materia. En caso de tener conocimiento de una operación intentada o sospechosa, ACTIVOS DIGITALES S.A.S., lo reportará de forma inmediata a la UIAF (Unidad de información y análisis financiero) y dará por terminada la relación contractual entre las partes, sin que haya lugar al pago de ninguna indemnización a favor de EL PROVEEDOR y/o CLIENTE.' : 'The SUPPLIER and/or CLIENT is obligated to comply with the policy of prevention and control of the risk of money laundering and financing of terrorism adopted by ACTIVOS DIGITALES S.A.S., as well as the international regulations and standards that govern the matter. In the event of becoming aware of an attempted or suspicious transaction, ACTIVOS DIGITALES S.A.S. will immediately report it to the UIAF (Financial Information and Analysis Unit) and will terminate the contractual relationship between the parties without any compensation payment to the SUPPLIER and/or CLIENT.'}</p>
                    <p>{language === 'es' ? 'Está usted de acuerdo con la Política arriba mencionada?' : 'Do you agree with the above-mentioned Policy?'}</p>
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
            </Modal>{/**/}
        </div>
    );
};

export default FormPersonas;

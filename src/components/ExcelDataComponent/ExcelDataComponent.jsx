import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ExcelDataComponent.module.css';

const ExcelDataComponent = () => {
    const [excelData, setExcelData] = useState([]);
    const tableContainerRef = useRef(null);

    // Ensure scrollbar visibility
    useEffect(() => {
        const checkScrollbarVisibility = () => {
            if (tableContainerRef.current) {
                const hasVerticalScrollbar = tableContainerRef.current.scrollHeight > tableContainerRef.current.clientHeight;
                tableContainerRef.current.style.overflowY = hasVerticalScrollbar ? 'scroll' : 'auto';
            }
        };

        // Check on component mount and after data fetch
        checkScrollbarVisibility();
        window.addEventListener('resize', checkScrollbarVisibility);
        return () => window.removeEventListener('resize', checkScrollbarVisibility);
    }, [excelData]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/datos').catch(error => console.error('Error fetching Excel data', error));
            if (response && response.data) {
                console.log('Respuesta del servidor:', response.data);
                setExcelData(response.data);
            }
        };  
        fetchData();
    }, []);

    return (
        <div>
            <div ref={tableContainerRef} className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    <tr>
<th>ID</th>
<th>Fecha</th>
<th>Tipo de Transacción</th>
<th>Nro. del Cliente</th>
<th>Tipo de Identificación del Cliente</th>
<th>Nombres del Cliente</th>
<th>Apellidos del Cliente</th>
<th>Nacionalidad del Cliente</th>
<th>Ciudad Domicilio del Cliente</th>
<th>Medio de Pago</th>
<th>Nro. Wallet</th>
<th>Código Hash de la Operación</th>
<th>Tipo de Activo Virtual</th>
<th>Cantidad de Activos Virtuales</th>
<th>Valor de la Transacción en Pesos</th>
<th>Saldo Actividad Virtual</th>
<th>Saldo en Pesos</th>
<th>Nro. Wallet Contraparte</th>
<th>Tipo de Identificación Contraparte</th>
<th>Número de Identificación Contraparte</th>
<th>Nombres Contraparte</th>
<th>Apellidos Contraparte</th>
<th>Nacionalidad Contraparte</th>
<th>Entidad PSAV Contraparte</th>
<th>País donde se Ubica la Entidad PSAV Contraparte</th>
</tr>
                    </thead>
                    <tbody>
{excelData.map((item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.FECHA}</td>
        <td>{item['TIPO DE TRANSACCION']}</td>
        <td>{item['NRO. DEL CLIENTE']}</td>
        <td>{item['TIPO DE IDENTIFICACION DEL CLIENTE']}</td>
        <td>{item['NOMBRES DEL CLIENTE']}</td>
        <td>{item['APELLIDOS DEL CLIENTE']}</td>
        <td>{item['NACIONALIDAD DEL CLIENTE']}</td>
        <td>{item['CIUDAD DOMICILIO DEL CLIENTE']}</td>
        <td>{item['MEDIO DE PAGO']}</td>
        <td>{item['NRO. WALLET']}</td>
        <td>{item['CODIGO HASH DE LA OPERACIÓN']}</td>
        <td>{item['TIPO DE ACTIVO VIRTUAL']}</td>
        <td>{item['CANTIDAD DE ACTIVOS VIRTUALES']}</td>
        <td>{item['VALOR DE LA TRANSACCION EN PESOS']}</td>
        <td>{item['SALDO ACTIVIDAD VIRTUAL']}</td>
        <td>{item['SALDO EN PESOS']}</td>
        <td>{item['NRO. WALLET CONTRAPARTE']}</td>
        <td>{item['TIPO DE IDENTIFICACION CONTRAPARTE']}</td>
        <td>{item['NUMERO DE INDETIFICACION CONTRAPARTE']}</td>
        <td>{item['NOMBRES CONTRAPARTE']}</td>
        <td>{item['APELLIDOS CONTRAPARTE']}</td>
        <td>{item['NACIONALIDAD CONTRAPARTE']}</td>
        <td>{item['ENTIDAD PSAV CONTRAPARTE']}</td>
        <td>{item['PAIS DONDE SE UBICA LA ENTIDAD PSAV CONTRAPARTE']}</td>
    </tr>
))}
</tbody>

                </table>
            </div>
        </div>
    );
};

export default ExcelDataComponent;

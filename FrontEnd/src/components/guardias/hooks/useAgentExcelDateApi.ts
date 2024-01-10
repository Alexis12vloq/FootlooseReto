import { useState, useCallback } from 'react';
import { Button } from '@chakra-ui/react';  // Asegúrate de importar Button de Chakra UI
import * as XLSX from 'xlsx';
import { ExcelProductDto } from '../../../metrics/excelProductDTO';

const useExcelExport = (fileName: any) => {
    const handleExport = useCallback((data: any) => {
        console.log(data)
        const mapearDatos = (data: any[]) => {
            const datosExportados: ExcelProductDto[] = data.map((item: any) => {
                return {
                    NombreProducto: item.NombreProducto,
                    NombreColor: item.Color.NombreColor,
                    NombreMarca: item.Marca.NombreMarca,
                    NombreModelo: item.Modelo.NombreModelo,
                    Talla: item.Talla.NombreTalla,
                    PrecioVenta: item.PrecioVenta,
                    Imagen: item.imagen,
                };
            });
            return datosExportados;
        };
        const worksheet = XLSX.utils.json_to_sheet(mapearDatos(data));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Page 1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }, [fileName]);
    return {
        handleExport,
    };
};

export default useExcelExport;

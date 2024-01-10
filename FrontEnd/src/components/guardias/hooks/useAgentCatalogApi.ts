import { useState, useEffect } from "react";
import axios from "axios";

export const useCatalogoProductosApi = () => {
    const [marcas, setMarcas] = useState<any>();
    const [modelos, setModelos] = useState<any>();
    const [colores, setColores] = useState<any>();
    const [tallas, setTallas] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        const url = 'http://localhost:3000/productos/catalogo';

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response);
                const responseData: any = response.data;

                // Asumiendo que la estructura de tu respuesta es algo como:
                // responseData = { marcas: [...], modelos: [...], colores: [...], tallas: [...] }

                setMarcas(responseData.marcas);
                setModelos(responseData.modelos);
                setColores(responseData.colores);
                setTallas(responseData.tallas);

                setLoading(false);
                setError(null);
            } catch (error) {
                setError("Error al realizar la petición para obtener el catálogo de productos.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        marcas,
        setMarcas,
        modelos,
        setModelos,
        colores,
        setColores,
        tallas,
        setTallas,
        loading,
        setLoading,
        error,
        setError,
    } as const;
};

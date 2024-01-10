import { useState } from "react";
import axios from "axios";
import type { ProductDto } from "../../../metrics/createdProductDTO";

const useEnviarProducto = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const enviarProducto = async (datosProducto: any) => {
        setLoading(true);


        const createProductDto: ProductDto = {
            NombreProducto: datosProducto.nombre,
            idMarca: datosProducto.marca,
            idModelo: datosProducto.modelo,
            idColor: datosProducto.color,
            idTalla: datosProducto.talla,
            PrecioVenta: datosProducto.precio,
        };

        try {
            const response = await axios.post("http://localhost:3000/productos/created", createProductDto);

            if (response.status === 201) {
                setLoading(false);
                setError(null);
                return response.data; // Puedes devolver los datos que recibes del backend si es necesario
            } else {
                setLoading(false);
                setError("Error en la respuesta del servidor.");
                return null;
            }
        } catch (error) {
            setLoading(false);
            setError("Error al realizar la petición al servidor.");
            return null;
        }
    };

    return { loading, error, enviarProducto };
};

export default useEnviarProducto;

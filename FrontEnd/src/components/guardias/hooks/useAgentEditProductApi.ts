import { useState } from "react";
import axios from "axios";
import { ProductDto } from "../../../metrics/createdProductDTO";

const useEditProduct = () => {
    const [editedProduct, setEditedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const editProduct = async (productId: any, newData: any, setUpdateTable: any) => {
        try {
            setLoading(true);
            // Realizar la solicitud para editar el producto en el backend usando axios u otra librería de HTTP.
            const editProductDto: ProductDto = {
                NombreProducto: newData.nombre,
                idMarca: newData.marca,
                idModelo: newData.modelo,
                idColor: newData.color,
                idTalla: newData.talla,
                PrecioVenta: newData.precio,
            };
            const response = await axios.put(`http://localhost:3000/productos/${productId}`, editProductDto);
            setEditedProduct(response.data);
            setUpdateTable(response.data)
            setLoading(false);
            setError(null);
        } catch (error) {
            setLoading(false);
            setError("Error al editar el producto");
        }
    };

    return { editedProduct, loading, error, editProduct };
};

export default useEditProduct;

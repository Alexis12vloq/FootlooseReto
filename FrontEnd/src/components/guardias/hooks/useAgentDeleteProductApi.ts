// useAgentDeleteProductApi.ts
import { useState } from 'react';
import axios from 'axios';

const useAgentDeleteProductApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const deleteProduct = async (productId: number, setUpdateTable: any) => {
        try {
            setLoading(true);

            const response = await axios.delete(`http://localhost:3000/productos/${productId}`);

            if (response.status === 200) {
                setLoading(false);
                setError(null);
                return true;
            } else {
                setLoading(false);
                setError('Error al eliminar el producto.');
                return false;
            }
        } catch (error) {
            setLoading(false);
            setError('Error al realizar la solicitud.');
            return false;
        }
    };

    return { deleteProduct, loading, error };
};

export default useAgentDeleteProductApi;

import { useState } from 'react';
import axios from 'axios';

const useAgentPdfProductApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const pdfProductDetails = async (productId: number) => {
        try {
            setLoading(true);

            const response = await axios.get(`http://localhost:3000/productos/${productId}/pdf`, {
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/pdf',
                },
                validateStatus: () => true,
            });
            if (response.status === 200) {
                setLoading(false);
                setError(null);

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `Product ${productId}.pdf`)
                document.body.appendChild(link)
                link.click();

                return true; // Ahora se devuelve true para indicar éxito en la descarga.
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

    return { pdfProductDetails, loading, error };
};

export default useAgentPdfProductApi;

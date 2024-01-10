import { useState, useEffect } from "react";
import axios from "axios";
import AgentGuardia from "../../../metrics/guardiasResponseDTO";

export const useAgentGuardiasApi = (
  equipoId: number,
  fechaInicio: string,
  fechaFin: string,
  isModalOpen: boolean,
  updateTable: any,
) => {
  const [agentGuardias, setAgentGuardias] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const authToken = localStorage.getItem("token");
    setLoading(true);

    // if (!authToken) {
    //   setLoading(false);
    //   setError("Token no encontrado en el localStorage.");
    //   return;
    // }

    const url = 'http://localhost:3000/productos';


    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        const responseData: any = response.data;
        setAgentGuardias(responseData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error al realizar la petición con el token.");
        setLoading(false);
      }
    };

    fetchData();
  }, [equipoId, fechaInicio, fechaFin, isModalOpen, updateTable]);

  return { agentGuardias, loading, error } as const;
};

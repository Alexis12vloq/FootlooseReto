import { useState, useEffect } from "react";
import axios from "axios";

export const useAgentAddGuardiasApi = (equipoId: number) => {
  const [agentGuardias, setAgentGuardias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (agentGuardias !== undefined) {
      if (agentGuardias === "Listo") {
        setAgentGuardias("");
      }
    }
  }, [agentGuardias]);
  const addGuardia = async (fechaGuardia: string) => {
    setLoading(true);
    const authToken = localStorage.getItem("token");
    const baseUrl = `https://opembpo.emeal.nttdata.com/admin/guardias/equipo/${equipoId}/agente/postulante`;

    if (!authToken) {
      setLoading(false);
      return;
    }

    const url = `${baseUrl}?tipo_guardia=1&fecha_guardia=${fechaGuardia}`;
    const headers = {
      AuthToken: `Bearer ${authToken}`,
    };

    try {
      const response = await axios.post(url, null, { headers });

      if (response.status === 200) {
        setAgentGuardias(response.data);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return { agentGuardias, loading, error, addGuardia };
};

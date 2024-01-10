import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Box, Button } from "@chakra-ui/react";
import "../../App.css";

interface RangoFechasProps {
  onSeleccionarRango: (fechaInicio: string, fechaFin: string) => void;
}

const RangoFechas: React.FC<RangoFechasProps> = ({ onSeleccionarRango }) => {
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);

  const obtenerRangoFechas = () => {
    if (fechaInicio && fechaFin) {
      const fechaInicioStr = format(fechaInicio, "yyyy-MM-dd");
      const fechaFinStr = format(fechaFin, "yyyy-MM-dd");
      onSeleccionarRango(fechaInicioStr, fechaFinStr);
    }
  };

  return (
    <Box display="flex">
      <div>
        <label>Fecha de inicio:</label>
        <DatePicker
          className="custom-datepicker"
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date as Date)}
        />
      </div>
      <div>
        <label>Fecha de fin:</label>
        <DatePicker
          className="custom-datepicker"
          selected={fechaFin}
          onChange={(date) => setFechaFin(date as Date)}
        />
      </div>
      <Button
        marginLeft="30px"
        onClick={obtenerRangoFechas}
        backgroundColor="#90EE90"
      >
        <p style={{ marginBottom: "3px", fontSize: "15px" }}>Buscar</p>
      </Button>
    </Box>
  );
};
export default RangoFechas;

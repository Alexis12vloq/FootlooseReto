import React, { useEffect } from "react";
import { Box, Spinner, Button, InputGroup, InputRightElement, IconButton, Input } from "@chakra-ui/react";
import { useAgentGuardiasApi } from "./hooks";
import { useState } from "react";
import GuardiaTableDetails from "./guardiaTable";
import { SearchIcon, SmallAddIcon } from "@chakra-ui/icons";

import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Heading,
} from "@chakra-ui/react";
import RangoFechas from "../datepicker/datepicker";
import NuevoGuardiaModal from "./addGuardiasModal";
import useExcelExport from "./hooks/useAgentExcelDateApi";

const GuardiaTable: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>("2023-11-01");
  const [fechaFin, setFechaFin] = useState<string>("2023-11-03");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTable, setUpdateTable] = useState([]);
  const { agentGuardias, loading } = useAgentGuardiasApi(
    55,
    fechaInicio,
    fechaFin,
    isModalOpen,
    updateTable
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState(agentGuardias);
  const { handleExport } = useExcelExport('Excel Export');
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setProductos(agentGuardias)
  }, [agentGuardias])
  useEffect(() => {
    console.log(searchTerm)
    if (searchTerm == '') {
      setProductos(agentGuardias)
      return
    }
    const filteredProducts = productos.filter((product: any) =>
      product.NombreProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Marca.NombreMarca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Modelo.NombreModelo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductos(filteredProducts);
  }, [searchTerm])

  const theme = extendTheme({});

  const handleSeleccionarRango = (fechaInicio: string, fechaFin: string) => {
    setFechaInicio(fechaInicio);
    setFechaFin(fechaFin);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const dowloadExcel = () => {
    handleExport(productos)

  };
  return (
    <Box m={"50px"}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Heading as="h2" marginBottom="50px">
          Lista de las Productos
        </Heading>
        <Box display="flex" justifyContent="space-between">
          <InputGroup >
            <Input
              width="55%"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button
            width="35%"
            onClick={dowloadExcel}
            marginRight="30px"
            backgroundColor="#90EE90"
          >
            <p >Descargar Excel</p>
          </Button>
          <Button
            width="35%"

            onClick={openModal}
            marginBottom="30px"
            backgroundColor="#90EE90"
          >
            <SmallAddIcon fontSize="20px" />
            <p style={{ marginBottom: "3px" }}>Agregar Nuevo Producto</p>
          </Button>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <GuardiaTableDetails setUpdateTable={setUpdateTable} products={productos || []} />
        )}
        <div>
          <NuevoGuardiaModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </ChakraProvider>
    </Box>
  );
};

export default GuardiaTable;

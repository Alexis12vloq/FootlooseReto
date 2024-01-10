import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  MenuIcon,
  IconButton,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import { ProductTableProps } from "../../metrics/guardiasResponseDTO";
import { ArrowUpDownIcon, EditIcon, DeleteIcon, DownloadIcon, HamburgerIcon } from "@chakra-ui/icons";
import NuevoGuardiaModal from "./addGuardiasModal";
import ModalDelete from "./modalDelete";
import useAgentPdfProductApi from "./hooks/useAgentPdfProductsApi";

const GuardiaTableDetails: React.FC<ProductTableProps> = ({ setUpdateTable, products }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [productoEditar, setProductoEditar] = useState<any>([]);
  const [productoEliminar, setProductoEliminar] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const { pdfProductDetails } = useAgentPdfProductApi();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalOpenDelete(false);
  };

  const openModalDelete = () => {
    setIsModalOpenDelete(true);
  };
  const customTheme = extendTheme({
    components: {
      Table: {
        variants: {
          custom: {
            bg: 'blue.100',
            color: 'white',
            borderRadius: 'md',
          },
        },
      },
    },
  });
  return (
    <Box>
      <>
        <ChakraProvider theme={customTheme}>

          <Table marginTop="30px" variant="simple" colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Nombre Producto</Th>
                <Th>Marca</Th>
                <Th>Modelo</Th>
                <Th>Color</Th>
                <Th>Talla</Th>
                <Th>Precio Venta</Th>
                <Th>Imagen</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            {products.map((producto, index) => (
              <Tbody>
                <Tr key={producto.NombreProducto}>
                  <Td>{producto.NombreProducto}</Td>
                  <Td>{producto.Marca.NombreMarca}</Td>
                  <Td>{producto.Modelo.NombreModelo}</Td>
                  <Td>{producto.Color.NombreColor}</Td>
                  <Td>{producto.Talla.NombreTalla}</Td>
                  <Td>S/ {producto.PrecioVenta}</Td>
                  <Td>
                    <img src={producto.imagen} alt="Producto" style={{ width: '80px', height: '80px' }} />
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton} // Utiliza IconButton en lugar de Button para Icon
                        variant="outline"
                        ml="auto"
                        textAlign="center"
                      >
                        <Icon as={HamburgerIcon} />
                      </MenuButton>

                      <MenuList>
                        <MenuItem icon={<EditIcon />} onClick={() => { openModal(); setProductoEditar(producto) }}>
                          Editar
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon />} onClick={() => { openModalDelete(); setProductoEliminar(producto) }}>
                          Eliminar
                        </MenuItem>
                        <MenuItem icon={<DownloadIcon />} onClick={() => pdfProductDetails(producto.idProducto)}>
                          Exportar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
          <NuevoGuardiaModal setUpdateTable={setUpdateTable} isOpen={isModalOpen} onClose={closeModal} productoEditar={productoEditar} />
          <ModalDelete setUpdateTable={setUpdateTable} isOpen={isModalOpenDelete} onClose={closeModalDelete} product={productoEliminar} />
        </ChakraProvider>
      </>
    </Box >
  );
};

export default GuardiaTableDetails;

import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
  Spinner,
  ChakraProvider,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useAgentAddGuardiasApi } from "./hooks";
import { format } from "date-fns";
import "../../App.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCatalogoProductosApi } from "./hooks/useAgentCatalogApi";
import useEnviarProducto from "./hooks/useAgentCreationProductApi";
import useEditProduct from "./hooks/useAgentEditProductApi";

const NuevoGuardiaModal = ({
  isOpen,
  onClose,
  productoEditar,
  setUpdateTable,
}: {
  isOpen: any;
  onClose: any;
  productoEditar?: any;
  setUpdateTable?: any;
}) => {
  const [fechaGuardia, setFechaGuardia] = useState(new Date());

  const {
    marcas,
    setMarcas,
    modelos,
    setModelos,
    colores,
    setColores,
    tallas,
    setTallas,
    loading,
    error,
    setError,
  } = useCatalogoProductosApi();
  const equipoId = 55;

  const schema = yup.object().shape({
    nombre: yup.string().required("Este campo es requerido"),
    // imagen: yup.string().url("Debe ser una URL válida").required("Este campo es requerido"),
    precio: yup.number().positive("Debe ser mayor que 0").required("Este campo es requerido"),
    marca: yup.number().required("Este campo es requerido"),
    modelo: yup.number().required("Este campo es requerido"),
    color: yup.number().required("Este campo es requerido"),
    talla: yup.number().required("Este campo es requerido"),
  });
  const { enviarProducto } = useEnviarProducto();
  const { editedProduct, editProduct } = useEditProduct();
  const handleEnviarProducto = async (datosProducto: any) => {
    const resultado = await enviarProducto(datosProducto);

    if (resultado) {
      onClose()
      console.log("Producto enviado exitosamente:", resultado);
    } else {
      console.error("Error al enviar el producto:", error);
    }
  };
  const onSubmit = async (data: any) => {
    try {
      if (productoEditar) {
        await editProduct(productoEditar.idProducto, data, setUpdateTable);
      } else {
        await handleEnviarProducto(data);
      }
      onClose();
    } catch (error) {
      console.error("Error durante el envío o edición del producto:", error);
    }
  };

  const MyForm = ({ onSubmit }: any) => {
    const { handleSubmit, control, register, formState: { errors }, setValue } = useForm({
      resolver: yupResolver(schema),
    });
    // const handleFileChange = (e: any) => {
    //   const file = e.target.files[0];

    //   if (file) {
    //     setValue("imagen", file);
    //   }
    // };
    useEffect(() => {
      if (productoEditar) {
        setValue("nombre", productoEditar.NombreProducto);
        setValue("precio", productoEditar.PrecioVenta);
        setValue("marca", productoEditar.Marca.idMarca);
        setValue("modelo", productoEditar.Modelo.idModelo);
        setValue("color", productoEditar.Color.idColor);
        setValue("talla", productoEditar.Talla.idTalla);
      }
    }, [productoEditar]);
    return (
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <ChakraProvider>
          <Box display="flex" flexDirection="column" mb={4}>
            <Box>
              <FormControl mb={2}>
                <FormLabel>Nombre</FormLabel>
                <Input {...register("nombre")} />
                <span style={{ color: 'red' }}>{errors.nombre?.message}</span>
              </FormControl>

              {/* <FormControl mb={2}>
                <FormLabel>Imagen </FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                />
                <span>{errors.imagen?.message}</span>
              </FormControl> */}
            </Box>

            <Box>
              <FormControl mb={4}>
                <FormLabel>Precio</FormLabel>
                <Input type="number" {...register("precio")} />
                <span style={{ color: 'red' }}>{errors.precio?.message}</span>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Modelo</FormLabel>
                <Controller
                  name="modelo"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {modelos.map((modelo: any) => (
                        <option key={modelo.idModelo} value={modelo.idModelo}>
                          {modelo.NombreModelo}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <span style={{ color: 'red' }}>{errors.modelo?.message}</span>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Talla</FormLabel>
                <Controller
                  name="talla"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {tallas.map((talla: any) => (
                        <option key={talla.idTalla} value={talla.idTalla}>
                          {talla.NombreTalla}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <span style={{ color: 'red' }}>{errors.talla?.message}</span>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Marca</FormLabel>
                <Controller
                  name="marca"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {marcas.map((marca: any) => (
                        <option key={marca.idMarca} value={marca.idMarca}>
                          {marca.NombreMarca}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <span style={{ color: 'red' }}>{errors.marca?.message}</span>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Color</FormLabel>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      {colores.map((color: any) => (
                        <option key={color.idColor} value={color.idColor}>
                          {color.NombreColor}
                        </option>
                      ))}
                    </Select>
                  )}
                />
                <span style={{ color: 'red' }}>{errors.color?.message}</span>
              </FormControl>
            </Box>
          </Box>

          <Box textAlign="center">
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
            {loading ? (
              <Spinner />
            ) : (
              <Button type="submit" >
                Enviar
              </Button>
            )}
          </Box>

        </ChakraProvider>
      </form>
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        {productoEditar ? <ModalHeader>Editar el Producto</ModalHeader> : <ModalHeader>Agregar un Nuevo Producto</ModalHeader>}
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          <MyForm onSubmit={onSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NuevoGuardiaModal;

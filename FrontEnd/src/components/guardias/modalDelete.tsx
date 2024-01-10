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
import useAgentDeleteProductApi from "./hooks/useAgentDeleteProductApi";

const ModalDelete = ({
    isOpen,
    onClose,
    product,
    setUpdateTable,
}: {
    isOpen: any;
    onClose: any;
    product?: any;
    setUpdateTable?: any;
}) => {

    const { deleteProduct, loading, error } = useAgentDeleteProductApi();

    const handleDelete = async () => {
        const success = await deleteProduct(product.idProducto, setUpdateTable);
        console.log(success);
        if (success) {
            onClose()
        } else {
            // Manejar el error si la eliminación falla
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader textAlign="center">Borrar el Producto {product.NombreProducto}</ModalHeader>
                <ModalFooter width="100%" textAlign="center">
                    <Box width="100%" textAlign="center">
                        <Button variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDelete}  >
                            Confirmar
                        </Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalDelete;

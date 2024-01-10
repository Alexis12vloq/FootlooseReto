import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, LoginResponse } from "../../metrics/loginResponseDTO";
import { useLoginApi } from "./hooks";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("El User es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const LoginForm: React.FC = () => {
  const [loginResponse, setLoginResponse] = useState<null | LoginResponse>(
    null
  );
  localStorage.setItem("token", "");
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { status, loginData, loading, error: loginError, submitLogin } = useLoginApi();
  useEffect(() => {
    if (status === 200) {
      navigate("/productos");
    }
  }, [loginData, navigate]);
  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;
      if (!loading) {
        submitLogin(email, password);
        if (loginData) {
          console.log(loginData)
          console.log(loginError)
          setLoginResponse(loginData);
        } else {
          setError(loginError || "Error desconocido en el inicio de sesión.");
        }
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <Center style={{ zIndex: "100", justifyContent: "start", marginLeft: "100px" }} minH="100vh">
      <VStack spacing={4} align="left">
        <Heading style={{ zIndex: "100" }} color="white" fontSize="35px" >Registrate Para Acceder a Los Productos</Heading>

        <Box style={{ marginLeft: "55px", backgroundColor: "white", zIndex: "100" }} w="md" borderWidth="1px" p={4} borderRadius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="20px">
              <FormLabel>User</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {loginError && (
                <Alert status="error">
                  <AlertIcon />
                  {loginError}
                </Alert>
              )}
            </FormControl>

            <FormControl mt="20px">
              <FormLabel>Contraseña</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
              {loginError && (
                <Alert status="error">
                  <AlertIcon />
                  {loginError}
                </Alert>
              )}
            </FormControl>
            {status == 200 && (
              <Alert status="success">
                <ChatIcon mr="10px" />
                Validado
              </Alert>
            )}

            <Button mt="40px" colorScheme="teal" type="submit">
              Iniciar Sesión
            </Button>

          </form>
          <Alert marginTop="20px" status="info">
            <AlertIcon />
            ¡LLena El Formulario Con tus Datos!
          </Alert>
        </Box>


      </VStack>
    </Center>
  );
};

export default LoginForm;

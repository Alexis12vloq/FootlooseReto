import LoginForm from "./loginForm";
import React from "react";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
export const Login = () => {
  const theme = extendTheme({});
  return (
    <>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <div className="Apps" >
          <LoginForm />
        </div>
      </ChakraProvider>
    </>
  );
};

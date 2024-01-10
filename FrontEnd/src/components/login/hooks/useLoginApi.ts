import { useState } from "react";
import axios from "axios";
import { LoginResponse } from "../../../metrics/loginResponseDTO";

export const useLoginApi = () => {
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);


  const submitLogin = async (usuario: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username: usuario,
          password: password,
        }
      );
      setStatus(response.status);
      const responseData: LoginResponse = response.data;
      setLoginData(responseData);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error?.response.data.message);
      setStatus(error?.response.data.status);
      setLoading(false);
    }
  };

  return { status, loginData, loading, error, submitLogin } as const;
};

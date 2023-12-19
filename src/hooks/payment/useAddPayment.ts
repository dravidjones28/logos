import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

interface Payment {
  txnid: string;
  amount: string;
  productinfo: string;
  name: string;
  phone: string;
  email: string;
  udf1: string;
  udf2: string | undefined;
  udf3: string;
  udf4: string | undefined;
  udf5: string | undefined;
  udf6: string | undefined;
  udf7: string | undefined;
  udf8: string | undefined;
  udf9: string;
  udf10: string;
  unique_id: string;
  split_payments: string;
  sub_merchant_id: string;
  customer_authentication_id: string;
  surl: string;
  furl: string;
}

const apiClient = new APIClient<string, Payment>("/initiate_payment");

const useAddPayment = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const query = useQueryClient();

  return useMutation<string, Error, Payment>({
    mutationFn: (data: Payment) => apiClient.payment(data),

    onSuccess: async (res, _payment) => {
      try {
        const url = res;
        window.open(url);
        query.clear();
        return navigate("/", { replace: true });
      } catch (error) {
        toast({
          title: "Failed",
          description: `Payment Failed`,
          position: "top",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    },

    onError: (error) => {
      console.log(error);
      if (error instanceof Error && "response" in error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError; // Type assertion to AxiosError

          console.log(axiosError.response.data);
          // Check if error.response exists before accessing .data
          if (axiosError.response) {
            const errorMessage = axiosError.response.data;
            toast({
              title: "Failed",
              description: `${errorMessage}`,
              position: "top",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          } else {
            toast({
              title: "Failed",
              description: "Sorry, something happend",
              position: "top",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          }
        }
      }
    },
  });
};

export default useAddPayment;
function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

type AxiosError = {
  isAxiosError: true;
  response: {
    data: {
      message: string;
    };
  };
};

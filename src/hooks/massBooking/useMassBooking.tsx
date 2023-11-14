import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient, { PaymentReceive } from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { Value } from "../../pages/MassBooking";
import { YourBooking } from "./useMassBook";

interface Payment {
  fullName: string | undefined;
  email: string | undefined;
  massType: string | undefined;
  gregorianIntentionField?: string | undefined;
  normalIntentionField?: string | undefined;
  dates: Value | undefined;
  amount?: Number | undefined;
  totalCost?: Number | undefined;
  totalDays?: Number | undefined;
  weekdayCost?: Number | undefined;
  weekdays?: Number | undefined;
  weekendCost?: Number | undefined;
  weekends?: Number | undefined;
}

interface VerifyPayment {
  fullName: string | undefined;
  email: string | undefined;
  massType: string | undefined;
  gregorianIntentionField?: string | undefined;
  normalIntentionField?: string | undefined;
  dates: string[] | undefined;
  totalCost: Number | undefined;
  amount: Number | undefined;
  totalDays: Number | undefined;
  weekdayCost: Number | undefined;
  weekdays: Number | undefined;
  weekendCost: Number | undefined;
  weekends: Number | undefined;
}

const apiClient = new APIClient<PaymentReceive, Payment>("/payment");
const apiClient1 = new APIClient<PaymentReceive, VerifyPayment>(
  "/massVerifyPayment"
);

const useMassBooking = () => {
  const [Razorpay] = useRazorpay();
  const toast = useToast();
  const navigate = useNavigate();
  const __DEV__ = location.host === "localhost:5173";
  const query = useQueryClient();

  return useMutation<PaymentReceive, Error, Payment>({
    mutationFn: (data: Payment) => apiClient.payment(data),

    onSuccess: (res, payment) => {
      let options = {
        key: __DEV__ ? "rzp_test_xCzo2hA7eRxt6X" : "PRODUCTION_KEY",
        amount: `${res.orderId.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: res.orderId.currency,
        name: "Logos Retreat Center",
        description: "Retreat Booking",
        order_id: res.orderId.id,

        handler: async (res1: any) => {
          try {
            await apiClient1.verfiy(
              {
                fullName: payment.fullName,
                email: payment.email,
                massType: payment.massType,
                intention:
                  payment.gregorianIntentionField ||
                  payment.normalIntentionField,
                dates: payment.dates,
                totalCost: payment.totalCost,
                totalDays: payment.totalDays,
                weekdayCost: payment.weekdayCost,
                weekdays: payment.weekdays,
                weekendCost: payment.weekendCost,
                weekends: payment.weekends,
                ...res1,
              },
              res1.razorpay_signature
            );

            query.setQueryData(
              ["massVerifyPayment"],
              (yourBookings: YourBooking[] | undefined) => {
                if (yourBookings) {
                  const temp = {
                    intention:
                      payment.gregorianIntentionField ||
                      payment.normalIntentionField,
                    ...payment,
                  };
                  console.log(temp);
                  return [{ ...temp }, ...yourBookings];
                }

                return yourBookings;
              }
            );

            toast({
              title: "Success",
              description: `Payment was Successfull`,
              position: "top",
              status: "success",
              isClosable: true,
              duration: 3000,
            });
            navigate("/yourMassOffering");
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

        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    },

    onError: (error, _blog, context) => {
      if (!context) return;
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

export default useMassBooking;

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

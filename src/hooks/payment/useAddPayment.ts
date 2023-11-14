import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import APIClient, { PaymentReceive } from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { RetreatEvents } from "../retreatEvents/useRetreatEvents";
import { YourBooking } from "../yourBookings/useYourBookings";
import CryptoJS, { AES } from "crypto-js";

interface Payment {
  _id?: string;
  persons: any;
  amount: number;
  eventsId: string | undefined;
  slots?: number;
  title?: string;
  ledBy?: string;
  start?: string;
  end?: string;
  noOfDays?: number;
  eventsAmount?: string | undefined;
}

const apiClient = new APIClient<PaymentReceive, Payment>("/payment");
const apiClient1 = new APIClient<PaymentReceive, Payment>("/verifyPayment");
const apiClient2 = new APIClient<RetreatEvents, RetreatEvents>(
  "/retreatEvents"
);

const useAddPayment = (slug: string, events: RetreatEvents | undefined) => {
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
                eventId: slug,
                persons: payment.persons,
                amount: payment.amount,
                ...res1,
              },
              res1.razorpay_signature
            );

            await apiClient2.putData(
              {
                title: `${payment?.title}`,
                ledBy: `${payment?.ledBy}`,
                start: `${payment?.start}`,
                end: `${payment?.end}`,
                noOfDays: Number(payment?.noOfDays),
                cost: `${payment?.eventsAmount}`,
                slots: `${payment?.slots}`,
              },
              slug
            );

            const session = () => {
              if (sessionStorage.getItem("user")) {
                const session_storage = JSON.parse(sessionStorage.user);
                const decryptedObjectString = AES.decrypt(
                  session_storage,
                  "secretKey"
                ).toString(CryptoJS.enc.Utf8);
                const parse = JSON.parse(decryptedObjectString);
                return parse;
              }
            };
            const database = session();

            query.setQueryData(
              ["retreatEvents"],
              (oldData: RetreatEvents[] | undefined) => {
                if (oldData) {
                  // Find and update the specific event in the data
                  const updatedData = oldData.map((event) => {
                    if (event._id === slug) {
                      return {
                        ...event,
                        slots: `${payment?.slots}`,
                      };
                    }
                    return event;
                  });

                  console.log(updatedData);

                  return updatedData;
                }

                return oldData;
              }
            );

            query.setQueryData(
              ["verifyPayment"],
              (yourBookingData: YourBooking[] | undefined) => {
                if (yourBookingData) {
                  const temp = {
                    ...payment,
                    eventId: events,
                    bookingName: database?.name,
                    author: database?._id,
                  };
                  return [temp, ...yourBookingData];
                }

                return yourBookingData;
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
            navigate("/yourBookings");
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

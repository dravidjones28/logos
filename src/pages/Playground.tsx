import { Button } from "@chakra-ui/react";
import axios from "axios";
import db from "../components/common/db";
import LGBox from "../components/common/LGBox";
import usePlayGround from "../hooks/usePlayGround";

const Playground = () => {
  //   const temp = usePlayGround();

  const handlePayment = async (e: any) => {
    e.preventDefault();
    // temp.mutate({
    //   txnid: "mrdj005",
    //   amount: "300.00",
    //   productinfo: "Mass Booking",
    //   name: "Michael Raj",
    //   phone: "8197442805",
    //   email: "dravidjones2851999@gmail.com",
    //   udf1: "",
    //   udf2: "",
    //   udf3: "",
    //   udf4: "",
    //   udf5: "",
    //   udf6: "",
    //   udf7: "",
    //   udf8: "",
    //   udf9: "",
    //   udf10: "",
    //   unique_id: "",
    //   split_payments: "",
    //   sub_merchant_id: "",
    //   customer_authentication_id: "",
    //   surl: "https://sleepy-gold-pumps.cyclic.app/api/response",
    //   furl: "https://sleepy-gold-pumps.cyclic.app/api/response",
    // });

    await axios
      .post("http://localhost:3000/initiate_payment", {
        txnid: "mrdj100022",
        amount: "500.00",
        productinfo: "Mass Booking",
        name: "Michael Raj",
        phone: "8197442805",
        email: "dravidjones2851999@gmail.com",
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
        udf6: "",
        udf7: "",
        udf8: "",
        udf9: "",
        udf10: "",
        unique_id: "",
        split_payments: "",
        sub_merchant_id: "",
        customer_authentication_id: "",
        surl: "http://localhost:3000/response",
        furl: "http://localhost:3000/response",
      })
      .then((res) => {
        const url = res.data;

        return window.open(url, "_blank");
      })
      .catch((error) => console.log(error));
  };
  return (
    <LGBox>
      <script
        src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js"
        // Add any other script attributes here if needed
      ></script>
      <form onSubmit={handlePayment}>
        <Button type="submit">Payment</Button>
      </form>
    </LGBox>
  );
};

export default Playground;

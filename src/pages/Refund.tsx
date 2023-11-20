import { Card, Heading, Text } from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import { Terms } from "./TermsAndCondition";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Refund = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LGBox>
      <Card
        bg="#4a8edd"
        color="#fff"
        p={{ base: "10px", lg: "30px" }}
        my={5}
        mx={{ base: "20px", lg: "80px" }}
      >
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>Refund Policy</Heading>
        <Text fontWeight={500} fontSize={{ base: "14px", lg: "16px" }}>
          Last modified: 14 Sep 2023
        </Text>
        <Text fontWeight={500} mt={3}>
          At Logos Retreat Centre, we value your commitment to our retreats and
          services. We understand that sometimes plans change, and flexibility
          is important.
        </Text>
        <Terms
          title="Refunds"
          subtitle={[
            `We currently do not offer refunds for any of our retreats or services. We ask our participants to be sure of their plans before making a reservation.`,
          ]}
        />
        <Terms
          title="Rescheduling"
          subtitle={[
            `However, we understand that unforeseen circumstances may arise. If you are unable to attend a retreat you have booked, we offer the option to reschedule your attendance. Please contact us at least [Specify Number of Days] days before your scheduled retreat to arrange for rescheduling.`,
          ]}
        />
        <Terms
          subtitle={[
            `We appreciate your understanding and look forward to providing you with a valuable and enriching experience at our retreats.`,
          ]}
        />
      </Card>
    </LGBox>
  );
};

export default Refund;

import { useEffect } from "react";
import LGBox from "../components/common/LGBox";
import { Card, Heading, Text } from "@chakra-ui/react";
import { ContactCard, Terms } from "./TermsAndCondition";
import { useLocation } from "react-router-dom";

const Cancellation = () => {
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
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
          Cancellation Policy
        </Heading>
        <Text fontWeight={500} fontSize={{ base: "14px", lg: "16px" }}>
          Last modified: 14 Sep 2023
        </Text>
        <Terms title="Information" link={true} />
        <ContactCard />
      </Card>
    </LGBox>
  );
};

export default Cancellation;

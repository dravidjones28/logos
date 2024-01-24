import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import verifyImage from "../assets/verifyEmail.jpg";
import { useNavigate, useParams } from "react-router-dom";
import LGBox from "../components/common/LGBox";

const EmailSent = () => {
  const { reset, userEmail } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <LGBox>
        <Box display="flex" justifyContent="center" mt={5}>
          <Card
            px={8}
            width={{ base: 300, lg: 700 }}
            pb={5}
            border="1px solid #f3f3f3"
            boxShadow={"2xl"}
          >
            <Center>
              <Image
                src={verifyImage}
                width="300px"
                height="300px"
                objectFit="cover"
              />
            </Center>
            {reset && userEmail && (
              <>
                <Heading textAlign="center">Password reset</Heading>
                <Text textAlign="center" mt={3}>
                  We have sent a Link to{" "}
                  <span style={{ color: "blue" }}>{userEmail}</span>
                </Text>
                <Text textAlign="center">
                  Check your email and click on the link to proceed!
                </Text>
              </>
            )}

            {!reset && userEmail && (
              <>
                <Heading textAlign="center">Account Confirmation</Heading>
                <Text textAlign="center" mt={3}>
                  An email with your account confiramtion link has been sent to
                  your email :{" "}
                  <span style={{ color: "lightblue" }}>{userEmail}</span>
                </Text>
                <Text textAlign="center">
                  Check your email and come back to proceed
                </Text>
                <Button onClick={() => navigate(`/login/${userEmail}`)}>
                  Proceed
                </Button>
              </>
            )}
          </Card>
        </Box>
      </LGBox>
    </>
  );
};

export default EmailSent;

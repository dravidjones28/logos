import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import LGBox from "../components/common/LGBox";
import NavBar from "../components/NavBar/NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <LGBox>
        <Box padding={5}>
          <Heading>Oops</Heading>
          <Text>
            {isRouteErrorResponse(error)
              ? "This page does not exist."
              : "An unexpected error occurred."}
          </Text>
        </Box>
      </LGBox>
    </>
  );
};

export default ErrorPage;

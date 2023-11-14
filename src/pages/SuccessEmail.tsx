import LGBox from "../components/common/LGBox";
import { Box, Text } from "@chakra-ui/react";

const SuccessEmail = () => {
  return (
    <LGBox>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Text fontWeight={500} fontSize="24px">
          You have Verified Successfully, Please Login
        </Text>
      </Box>
    </LGBox>
  );
};

export default SuccessEmail;

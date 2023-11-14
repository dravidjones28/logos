import {
  Card,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  StatArrow,
  Box,
  Text,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import { ReactElement } from "react";

interface CardDetails {
  costName?: boolean;
  title: string;
  icon: ReactElement<ChakraIconProps>;
  stats: number;
  statArrow: "increase" | "decrease";
  statValue: number;
}

const DashboardCard = ({
  title,
  icon,
  stats,
  statArrow,
  statValue,
  costName,
}: CardDetails) => {
  return (
    <Card
      py={4}
      px={4}
      borderRadius="20px"
      // width={{ base: "100%", xl: "227px" }}
      width={{ base: "100%" }}
    >
      <Stat>
        <Box height="60px" display="flex" justifyContent="space-between">
          <Box>
            <StatLabel
              fontSize="13px"
              textTransform="uppercase"
              color="gray.400"
              fontWeight={700}
            >
              {title}
            </StatLabel>
            <StatNumber fontSize="18px" fontWeight={700}>
              {costName ? "₹" : "+"}
              {stats}
            </StatNumber>
          </Box>
          <Box
            borderRadius="50%"
            bg="#3182ce"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="40px"
            height="40px"
          >
            {icon}
            {/* <Icon boxSize={6} as={icon} color="#fff" /> */}
          </Box>
        </Box>
        <StatHelpText mt={6}>
          <Flex>
            <StatArrow type={statArrow} alignSelf="center" />
            <Text fontWeight={500}>{statValue}% Since last month</Text>
          </Flex>
        </StatHelpText>
      </Stat>
    </Card>
  );
};

export default DashboardCard;

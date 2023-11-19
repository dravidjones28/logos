import { Center, Box, Text } from "@chakra-ui/react";
import CountUp from "react-countup";

interface Props {
  decimals: number;
  end: number;
  title: string;
  subTitle: string;
}

const CountUpComponent = ({ decimals, end, title, subTitle }: Props) => {
  return (
    <CountUp
      start={0}
      end={end === 0 ? 24 / 7 : end}
      duration={1.75}
      separator=" "
      decimals={decimals}
      decimal=","
      suffix={end === 0 ? "" : "+"}
    >
      {({ countUpRef }) => (
        <Box maxWidth={300}>
          <Center>
            <span
              style={{
                fontSize: "50px",
                fontWeight: 500,
                color: "#358eed",
              }}
              ref={countUpRef}
            />
          </Center>
          <Text fontWeight={500} fontSize="20px" textAlign="center">
            {title}
          </Text>
          <Text textAlign="center" mt={2}>
            {subTitle}
          </Text>
        </Box>
      )}
    </CountUp>
  );
};

export default CountUpComponent;

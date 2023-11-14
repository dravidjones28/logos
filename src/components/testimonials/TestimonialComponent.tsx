import {
  Card,
  Flex,
  Icon,
  Box,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTimeFive } from "react-icons/bi";
import EmptyImage from "../../assets/no-image-placeholder.webp";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Testimonal {
  _id: string;
  imageUrl?: string;
  name: string;
  dateNow: Date | undefined;
  des: string;
}
const TestimonialComponent = ({
  imageUrl,
  name,
  dateNow,
  des,
  _id,
}: Testimonal) => {
  const truncatedName = name.length > 20 ? name.slice(0, 20) + "..." : name;
  const truncatedDes = des.length > 20 ? des.slice(0, 96) + "..." : des;
  let [resultDate, setResultDate] = useState<string>("");

  function updateDate() {
    const currentDate = moment();
    const specifiedDate = moment(dateNow);
    const duration = moment.duration(currentDate.diff(specifiedDate));

    const minutesAgo = duration.as("minutes");
    if (minutesAgo < 1) {
      setResultDate(`less than 1 minute ago`);
    } else if (minutesAgo < 2) {
      setResultDate(`less than 2 minutes ago`);
    } else if (minutesAgo < 60) {
      setResultDate(`less than ${Math.floor(minutesAgo)} minutes ago`);
    } else {
      const hoursAgo = Math.floor(duration.as("hours"));
      const value = (resultDate =
        hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`);
      setResultDate(value);
    }
  }
  const navigate = useNavigate();

  useEffect(() => {
    updateDate();
  }, []);

  return (
    <Card
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      // boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.2)"
      onClick={() => navigate(`${_id}`)}
      cursor="pointer"
      border="1px solid #f3f3f3"
      minWidth={{ base: "270px", lg: "300px" }}
      px={5}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      height="242px"

      // bg="#409aef"
    >
      <Box position="relative" top="-30px">
        <Image
          src={imageUrl ? `${imageUrl}` : `${EmptyImage}`}
          width="3.625rem"
          height="3.625rem"
          objectFit="cover"
          borderRadius="10px"
        />

        <Text
          fontSize="0.9375rem"
          lineHeight={1.5}
          color="rgb(52, 71, 103)"
          fontWeight={700}
          mb="4px"
        >
          {truncatedName}
        </Text>
        <Flex>
          <Icon as={BiTimeFive} mt={0.5} mr="3px" boxSize="15px" />
          <Text textAlign="center" fontSize="12px">
            {resultDate}
          </Text>
        </Flex>
        <Text
          my="30px"
          fontSize="1.0625rem"
          fontWeight={400}
          lineHeight={1.6}
          color="rgb(73, 76, 92)"
        >
          "{truncatedDes}"
        </Text>
      </Box>
    </Card>
  );
};

export default TestimonialComponent;

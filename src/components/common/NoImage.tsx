import { Avatar } from "@chakra-ui/react";
import db from "./db";

const NoImage = () => {
  const database = db();

  return (
    <Avatar
      bg="teal.500"
      color="#fff"
      size="sm"
      name={database?.name}
      src="https://bit.ly/broken-link"
      cursor="pointer"
    />
  );
};

export default NoImage;

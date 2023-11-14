import { Button } from "@chakra-ui/react";

const SearchButton = () => {
  return (
    <Button
      px={5}
      bg="#2D87EB"
      marginTop="10px"
      textTransform="uppercase"
      fontWeight={500}
      color="#fff"
      fontSize="14px"
      _hover={{
        backgroundColor: "#4b9df4",
      }}
    >
      Search
    </Button>
  );
};

export default SearchButton;

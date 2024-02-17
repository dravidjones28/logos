import {
  Box,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import store from "../../store";

interface Props {
  onClose: () => void;
  modalEvent: string;
}

const DashboardRetreatModal = ({ onClose, modalEvent }: Props) => {
  const retreatBookingsDashboard = store((s) => s.retreatBookingsDashboard);
  return (
    <Modal size="full" isOpen={true} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalEvent}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <SimpleGrid
              columns={{ base: 1, lg: 2, xl: 3 }}
              spacing={5}
              //   mx={{ base: "30px", lg: "145px" }}
              gap={20}
              justifyContent="center"
              mt={{ base: 5, lg: "20px" }}
            >
              {retreatBookingsDashboard.map((item) => (
                <>
                  <Box
                    border="1px solid #ccc"
                    borderRadius="10px"
                    mb="30px"
                    p={5}
                  >
                    <Text fontWeight={500}>First Name: {item.firstName}</Text>
                    <Text fontWeight={500}>Last Name: {item.lastName}</Text>
                    <Text fontWeight={500}>Age: {item.age}</Text>
                    <Text fontWeight={500}>Religion: {item.religion}</Text>
                    <Text fontWeight={500}>Gender: {item.sex}</Text>
                  </Box>
                </>
              ))}
            </SimpleGrid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DashboardRetreatModal;

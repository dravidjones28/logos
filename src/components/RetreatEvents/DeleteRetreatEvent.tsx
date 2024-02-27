import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import { MutableRefObject } from "react";
import { SingleEvent } from "../../pages/BookRetreat";
import useDeleteRetreatEvents from "../../hooks/retreatEvents/useDeleteRetreatEvents";

interface Props {
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
  events: SingleEvent | null;
  calendarRef: MutableRefObject<FullCalendar | null>;
}

const DeleteRetreatEvent = ({
  isDeleteOpen,
  onDeleteClose,
  events,
  calendarRef,
}: Props) => {
  const deleteEvent = useDeleteRetreatEvents(calendarRef, onDeleteClose);
  const handleDelete = () => {
    deleteEvent.mutate(events?._id ?? "");
  };
  return (
    <Modal
      isOpen={isDeleteOpen}
      onClose={() => {
        onDeleteClose();
      }}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete this Event {events?.eventName}?</ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button type="submit" colorScheme="red" mr={3} onClick={handleDelete}>
            {deleteEvent.isPending ? <Spinner /> : "Delete"}
          </Button>
          <Button
            mr={3}
            onClick={() => {
              onDeleteClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteRetreatEvent;

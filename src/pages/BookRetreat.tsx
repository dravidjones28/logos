import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Icon,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  Text,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AiFillFolderAdd } from "react-icons/ai";
import { BsCalendarDate, BsFillPersonPlusFill } from "react-icons/bs";
import { MdEventSeat } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiSubtitles } from "react-icons/pi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LGBox from "../components/common/LGBox";
import db from "../components/common/db";
import useRetreatEvents from "../hooks/retreatEvents/useRetreatEvents";
import useAddRetreatEvents from "../hooks/retreatEvents/useAddRetreatEvents";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import Footer from "../components/footer/Footer";

const schema = z
  .object({
    eventName: z
      .string()
      .min(3, "title must be contain minimum of 2 Characters"),
    ledBy: z.string().min(3, "Led By must be contain minimum of 2 Characters"),
    cost: z.string().min(1, "cost is required"),
    slots: z.string().min(1, "slot is required"),
    start: z.coerce.date().refine((start) => {
      const startDate = new Date(start);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set today's time to midnight for accurate comparison
      return startDate >= today;
    }, "Start date must be in the future"),
    end: z.coerce.date(),
  })
  .refine((data) => data.end > data.start, {
    message: "End date cannot be earlier than start date.",
    path: ["end"],
  });

interface SingleEvent {
  _id: string;
  eventName: string;
  ledBy: string;
  start: string;
  days: number;
  cost: string;
  slots: string;
}

type FormData = z.infer<typeof schema>;

const StyledFullCalendar = styled(FullCalendar)`
  z-index: -1;
`;

function renderEventContent(eventInfo: any) {
  console.log(eventInfo);
  return (
    <>
      {/* <div>{eventInfo.timeText}</div> */}
      <div>{eventInfo.event.title}</div>
      <span>Led By: {eventInfo.event.extendedProps.ledBy}</span>
    </>
  );
}

const BookRetreat: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [desktopWidth] = useMediaQuery("(min-width: 991px)");
  const [tabWidth] = useMediaQuery("(min-width: 768px)");
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data: events, isLoading, error } = useRetreatEvents();
  const addEvents = useAddRetreatEvents(() => {
    reset();
  }, calendarRef);

  const [singleEvent, setSingleEvent] = useState<SingleEvent | null>(null);
  const [showEvent, setShowEvent] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  

  const handleShowEvent = () => setShowEvent(!showEvent);

  const onSubmit = (data: FormData) => {
    const startDate = new Date(data.start);
    let endDate = new Date(data.end);
    endDate.setDate(endDate.getDate() + 1);

    const timeDifference = endDate.getTime() - startDate.getTime();
    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (calendarRef && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      console.log(data.end.toISOString().replace(/T.*$/, ""));

      calendarApi.unselect();
      const tempData = {
        title: data.eventName,
        start: startDate.toISOString().replace(/T.*$/, ""),
        end: endDate.toISOString().replace(/T.*$/, ""),
        noOfDays: daysDifference.toString(),
        ledBy: data.ledBy,
        cost: data.cost,
        slots: data.slots,
      };

      // calendarApi.addEvent({
      //   title: data.eventName,
      //   start: startDate.toISOString().replace(/T.*$/, ""),
      //   end: endDate.toISOString().replace(/T.*$/, ""),
      //   ledBy: data.ledBy,
      //   noOfDays: daysDifference,
      //   cost: data.cost,
      // });

      addEvents.mutate(tempData);

      onClose();
    }
  };

  // const handleDateSelect = (selectInfo: any) => {
  //   onOpen();

  //   let calendarApi = selectInfo.view.calendar;
  //   console.log(calendarApi);
  //   // onOpen();
  //   // let title = prompt("Please enter a new title for your event");
  //   // let calendarApi = selectInfo.view.calendar;
  //   // calendarApi.unselect(); // clear date selection
  //   // calendarApi.addEvent({
  //   //   id: createEventId(),
  //   //   title,
  //   //   start: selectInfo.startStr,
  //   //   end: selectInfo.endStr,
  //   //   allDay: selectInfo.allDay,
  //   // });
  // };

  const handleBookEvent = (clickInfo: any) => {
    const originalDate = new Date(clickInfo.event.start);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = originalDate.toLocaleDateString(undefined, options);
    console.log(clickInfo.event.extendedProps._id);
    // confirm(`${clickInfo.event.title} ${clickInfo.event.extendedProps.ledBy}`);
    setSingleEvent({
      eventName: clickInfo.event.title,
      ledBy: clickInfo.event.extendedProps.ledBy,
      start: formattedDate,
      days: clickInfo.event.extendedProps.noOfDays,
      cost: clickInfo.event.extendedProps.cost,
      _id: clickInfo.event.extendedProps._id,
      slots: clickInfo.event.extendedProps.slots,
    });
    handleShowEvent();

    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  };

  // const [currentEvents, setCurrentEvents] = useState<Event[]>([]);

  const isEndDateDisabled = !register("start");

  // const handleEventDrop = (eventDropInfo: any) => {
  //   const updatedEvent: Event = {
  //     ...(eventDropInfo.event.toPlainObject() as Event),
  //     start: eventDropInfo.event.start.toISOString(),
  //     end: eventDropInfo.event.end?.toISOString(),
  //   };

  // const updatedEvents: Event[] = currentEvents.map((event) =>
  //   event.id === updatedEvent.id ? updatedEvent : event
  // );

  // console.log(updatedEvent);

  // setCurrentEvents(updatedEvents);
  // };

  // const handleEventResize = (eventResizeInfo: any) => {
  // const updatedEvent: Event = {
  //   ...(eventResizeInfo.event.toPlainObject() as Event),
  //   start: eventResizeInfo.event.start.toISOString(),
  //   end: eventResizeInfo.event.end.toISOString(),
  // };

  // const updatedEvents: Event[] = currentEvents.map((event) =>
  // event.id === updatedEvent.id ? updatedEvent : event
  // );

  // setCurrentEvents(updatedEvents);
  // };

  const headerToolbarOptions = {
    right: "today prev next", // Remove "prev" from the left side
    // center: "title",
    // right: "dayGridMonth,timeGridWeek,timeGridDay",
  };
  const session = db();
  const auth = useAuth();

  console.log(Number(singleEvent?.slots) === 0 ? true : false);

  if (isLoading)
    return (
      <LGBox>
        <Box
          display="flex"
          height="70vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      </LGBox>
    );
  if (error) return <div>Error</div>;

  return (
    <LGBox>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <ModalContent w={desktopWidth ? 600 : tabWidth ? 400 : 300}>
            <ModalHeader>Create a Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Event Name</FormLabel>
                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={PiSubtitles} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("eventName", {
                      required: true,
                    })}
                    type="text"
                    size="lg"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                    placeholder="Enter a Event Name"
                  />
                </InputGroup>
                {errors.eventName && (
                  <FormHelperText color="red">
                    {errors.eventName.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl my={5}>
                <FormLabel>Led By</FormLabel>
                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={BsFillPersonPlusFill} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("ledBy", {
                      required: true,
                    })}
                    type="text"
                    size="lg"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                    placeholder="Led By"
                  />
                </InputGroup>
                {errors.ledBy && (
                  <FormHelperText color="red">
                    {errors.ledBy.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl my={5}>
                <FormLabel>Cost</FormLabel>
                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={BiMoneyWithdraw} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("cost", {
                      required: true,
                    })}
                    type="number"
                    size="lg"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                    placeholder="Cost amount"
                  />
                </InputGroup>
                {errors.cost && (
                  <FormHelperText color="red">
                    {errors.cost.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl my={5}>
                <FormLabel>Slots</FormLabel>
                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={MdEventSeat} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("slots", {
                      required: true,
                    })}
                    type="number"
                    size="lg"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                    placeholder="Number of slots"
                  />
                </InputGroup>
                {errors.slots && (
                  <FormHelperText color="red">
                    {errors.slots.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl my={5}>
                <FormLabel>Start Date</FormLabel>

                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={BsCalendarDate} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("start", {
                      required: true,
                    })}
                    type="date"
                    size="lg"
                    placeholder="Enter start date"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                  />
                </InputGroup>
                {errors.start && (
                  <FormHelperText color="red">
                    {errors.start.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl my={5}>
                <FormLabel>End Date</FormLabel>

                <InputGroup>
                  <InputLeftElement marginTop="5px">
                    <Icon as={BsCalendarDate} color="#5664d2" />
                  </InputLeftElement>
                  <Input
                    {...register("end", {
                      required: "End date is required",
                      disabled: isEndDateDisabled, // Conditionally disable the input
                    })}
                    type="date"
                    size="lg"
                    placeholder="Enter end date"
                    _placeholder={{
                      opacity: 1,
                      color: "gray.500",
                      fontSize: "15px",
                    }}
                  />
                </InputGroup>
                {errors.end && (
                  <FormHelperText color="red">
                    {errors.end.message}
                  </FormHelperText>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Create
              </Button>
              <Button
                mr={3}
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Modal
        isOpen={showEvent}
        onClose={() => {
          handleShowEvent();
        }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent w={desktopWidth ? 600 : tabWidth ? 400 : 300}>
          <ModalHeader>{singleEvent?.eventName}</ModalHeader>

          <ModalCloseButton />
          <ModalBody mb={3}>
            <Text fontWeight={500}>
              Event Name:{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.eventName}</span>
            </Text>
            <Text fontWeight={500} my={3}>
              Led by:{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.ledBy}</span>
            </Text>
            <Text fontWeight={500} my={3}>
              Cost :{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.cost}</span>
            </Text>
            <Text fontWeight={500} my={3}>
              Slots :{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.slots}</span>
            </Text>
            <Text fontWeight={500} my={3}>
              Date:{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.start}</span>
            </Text>
            <Text fontWeight={500}>
              No of Days:{" "}
              <span style={{ fontWeight: 700 }}>{singleEvent?.days}</span>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                if (Number(singleEvent?.slots) > 0) {
                  if (auth) navigate(`booking/${singleEvent?._id}`);
                  else {
                    toast({
                      title: "Please Login In",
                      description: "To book your retreats",
                      position: "top",
                      status: "error",
                      isClosable: true,
                      duration: 3000,
                    });

                    navigate("/login");
                  }
                }
              }}
              colorScheme="blue"
              mr={3}
              isDisabled={Number(singleEvent?.slots) === 0 ? true : false}
              // isDisabled={true}
            >
              Book Retreat
            </Button>
            <Button
              mr={3}
              onClick={() => {
                setShowEvent(false);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        my={5}
        mx={{ base: "20px", lg: "145px" }}
        display={{ base: "block", md: "flex" }}
        flex={1}
        justifyContent="space-between"
        zIndex="-1"
      >
        <Text
          color="rgb(52, 71, 103)"
          fontWeight={700}
          fontSize={{ base: "20px", lg: "30px" }}
          letterSpacing={1.1}
        >
          Retreat Calender
        </Text>
        <Box mt="10px">
          {session?.isAdmin && (
            <Button
              fontSize={{ base: "10px", lg: "15px" }}
              fontWeight={500}
              height="20px"
              borderRadius="7px"
              bg="#348ded"
              padding={{ base: "15px", lg: "20px" }}
              color="#fff"
              cursor="pointer"
              _hover={{ bg: "#70b7ff" }}
              onClick={() => {
                onOpen();
              }}
              leftIcon={<AiFillFolderAdd />}
            >
              Create
            </Button>
          )}
        </Box>
      </Box>
      <Box
        mx={{ base: "30px", lg: "145px" }}
        //backgroundColor: 'none',
        display="flex"
        margin="auto"
        marginTop="-4rem"
        backgroundColor="#FFF"
        paddingTop="4rem"
        borderRadius=".5rem"
        fontSize={{ base: "7px", sm: "8px", md: "12px", lg: "15px" }}
        justifyContent="center"
        flexWrap="nowrap"
      >
        <Box width={{ base: "298px", md: "600px", lg: "900px" }}>
          <StyledFullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            ref={calendarRef}
            // editable={session?.isAdmin ? true : false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={events}
            // select={handleDateSelect}
            eventContent={renderEventContent}
            // eventDrop={handleEventDrop}
            // eventResize={handleEventResize}
            headerToolbar={headerToolbarOptions}
            eventClick={handleBookEvent}
          />
        </Box>
      </Box>
      <Box mt={20}>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default BookRetreat;

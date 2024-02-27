import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  FormHelperText,
  ModalFooter,
  useMediaQuery,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsFillPersonPlusFill, BsCalendarDate } from "react-icons/bs";
import { MdEventSeat } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";
import { z } from "zod";
import { SingleEvent } from "../../pages/BookRetreat";
import { MutableRefObject, useState } from "react";
import useEditRetreatEvents from "../../hooks/retreatEvents/useEditRetreatEvents";
import FullCalendar from "@fullcalendar/react";

const schema = z
  .object({
    eventName: z
      .string()
      .min(3, "title must be contain minimum of 2 Characters"),
    ledBy: z.string().min(3, "Led By must be contain minimum of 2 Characters"),
    cost: z.string().min(1, "cost is required"),
    slots: z
      .string()
      .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 1, {
        message: "Slots must be a valid number greater than 1.",
      })
      .transform((value) => parseFloat(value)),
    start: z.coerce.date().refine((start) => {
      const startDate = new Date(start);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set today's time to midnight for accurate comparison
      return startDate > today;
    }, "Start date must be in the future"),
    end: z.coerce.date(),
  })
  .refine((data) => data.end > data.start, {
    message: "End date cannot be earlier than start date.",
    path: ["end"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  isEditOpen: boolean;
  onEditClose: () => void;
  events: SingleEvent | null;
  onSetEvents: (event: SingleEvent | null) => void;
  calendarRef: MutableRefObject<FullCalendar | null>;
}

const EditRetreatEvents = ({
  isEditOpen,
  onEditClose,
  events,
  onSetEvents,
  calendarRef,
}: Props) => {
  const [desktopWidth] = useMediaQuery("(min-width: 991px)");
  const [tabWidth] = useMediaQuery("(min-width: 768px)");

  const date1 = new Date(`${events?.start}`);
  const formattedDate1 = date1.toISOString().split("T")[0];

  const date2 = new Date(`${events?.end}`);
  const formattedDate2 = date2.toISOString().split("T")[0];

  // console.log(calendarRef);

  const editEvent = useEditRetreatEvents(
    () => {
      reset();
    },
    events?._id ?? "",
    calendarRef
  );

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventName: events?.eventName,
      ledBy: events?.ledBy,
      cost: `${events?.cost}`,
      // start: new Date(Date.parse(`${events?.start}`)),
      // end: new Date(`${events?.end}`),
    },
  });

  console.log(events);

  const isEndDateDisabled = !register("start");

  const onSubmit = (data: FormData) => {
    const startDate = new Date(data.start);
    let endDate = new Date(data.end);
    endDate.setDate(endDate.getDate() + 1);

    const timeDifference = endDate.getTime() - startDate.getTime();
    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const tempData = {
      title: data.eventName,
      start: startDate.toISOString().replace(/T.*$/, ""),
      end: endDate.toISOString().replace(/T.*$/, ""),
      noOfDays: daysDifference.toString(),
      ledBy: data.ledBy,
      cost: data.cost,
      slots: data.slots,
    };

    editEvent.mutate(tempData);

    onSetEvents(null);
    onEditClose();

    // console.log(data);
  };

  const [currentDate, setCurrentDate] = useState(formattedDate1 || "");
  const [currentDate1, setCurrent2Date] = useState(formattedDate2 || "");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(event.target.value);
  };

  const handleDate1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent2Date(event.target.value);
  };

  return (
    <Modal
      isOpen={isEditOpen}
      onClose={() => {
        onEditClose();
        reset();
      }}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <ModalContent
          w={desktopWidth ? 600 : tabWidth ? 400 : 300}
          h={desktopWidth ? 500 : tabWidth ? 400 : 400}
        >
          <ModalHeader>Edit a Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
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
                  defaultValue={events?.eventName}
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
                  defaultValue={events?.ledBy}
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
                  defaultValue={events?.cost}
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
                  defaultValue={events?.slots}
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
                  value={currentDate}
                  onChange={handleDateChange}
                  defaultValue={events?.start}
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
                  onChange={handleDate1Change}
                  value={currentDate1}
                  defaultValue={events?.end}
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
              Edit
            </Button>
            <Button
              mr={3}
              onClick={() => {
                onEditClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditRetreatEvents;

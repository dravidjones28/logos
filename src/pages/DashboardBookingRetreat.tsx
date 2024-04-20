import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa";
import { MdOutlinePrint } from "react-icons/md";
import ReactToPrint from "react-to-print";
import DashboardRetreatModal from "../components/Dashboard/DashboardRetreatModal";
import useRetreatBookingsAll from "../hooks/dashboard/retreatBookings/useRetreatBookingAll";
import { RetreatBooking } from "../hooks/retreatBookings/useYourBookings";
import { default as store, default as useRetreatQuery } from "../store";

const DashboardBookingRetreat = () => {
  const {
    data: retreatBookingData,
    error,
    isLoading,
  } = useRetreatBookingsAll();

  const retreatBookings = useRetreatQuery((s) => s.retreatBookings);
  const setRetreatBookingDate = useRetreatQuery((s) => s.setRetreatBookingDate);

  const setNextPage = useRetreatQuery((s) => s.setRetreatBookingPage);
  const setRetreatBookingLimit = useRetreatQuery(
    (s) => s.setRetreatBookingPageSize
  );
  const setRetreatBookingPage = useRetreatQuery((s) => s.setRetreatBookingPage);

  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    retreatBookings.pageSize
      ? page * retreatBookings?.pageSize >= totalCount
      : false;

  const header = [
    "Booking Name",
    "Email",
    "Room Preference",
    "Phone Number",
    "Family Members",
    // "Event Title",
    // "Event Date",
  ];

  function handleDownloadExcel() {
    const transformedBody = (retreatBookingData?.results || []).map((item) => ({
      bookingName: item.bookingName ?? "",
      email: item.email ?? "",
      bookingForFamilyOrIndividual: item.bookingForFamilyOrIndividual ?? "",
      phoneNumber: item.contactNumber ?? "",
      familyMembers: (item.familyMembers ?? [])
        .map(
          (member, index) =>
            `
            id: ${index}, 
            First Name: ${member.firstName},
          Last Name: ${member.lastName},
          Religion: ${member.religion},
          sex: ${member.sex}.
          age: (${member.age})`
        )
        .join(", "),

      // Add other properties as needed
    }));
    downloadExcel({
      fileName: "Retreat Bookings",
      sheet: "Pr",
      tablePayload: {
        header,
        body: transformedBody,
      },
    });
  }

  const tableRef = useRef<HTMLTableElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setRetreatBooking = store((s) => s.setRetreatBookingsDashboard);
  const [modalEvent, setModalEvent] = useState("");

  const handleView = (booking: RetreatBooking) => {
    onOpen();
    setModalEvent(booking.events.title);
    if (booking.bookingForFamilyOrIndividual === "individual") {
      let temp = {
        firstName: booking.firstName,
        lastName: booking.lastName,
        age: booking.age,
        sex: booking.sex,
        religion: booking.religion,
      };

      return setRetreatBooking([temp]);
    } else {
      if (booking.familyMembers) {
        setRetreatBooking([...booking.familyMembers]);
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 5 }}
        mt={{ base: 5, lg: 0 }}
      >
        Retreat Bookings
      </Heading>

      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={4}>
          <Select
            // placeholder="Retreat Name"
            width={{ base: "100%", md: "200px" }}
            value={retreatBookings.pageSize}
            onChange={(e) => {
              setRetreatBookingLimit(Number(e.target.value));
            }}
            size="sm"
            isDisabled={isLoading || retreatBookings.searchDate ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show 100</option>
            <option value={200}>Show 200</option>
          </Select>
          <Input
            value={retreatBookings.searchDate}
            type="date"
            width="200px"
            onChange={(e) => setRetreatBookingDate(e.target.value)}
            size="sm"
            mb={{ base: "15px", lg: "0" }}
          />
          <Button
            size="sm"
            onClick={() => {
              setRetreatBookingDate("");
              setRetreatBookingPage(0, retreatBookingData?.count, "next");
              setRetreatBookingLimit(10);
            }}
          >
            All
          </Button>
          <Tooltip label="Download as excel">
            <Box>
              <Icon
                as={FaDownload}
                boxSize={4}
                color="#666"
                cursor="pointer"
                _hover={{ color: "#ccc" }}
                marginTop={2}
                onClick={handleDownloadExcel}
              />
            </Box>
          </Tooltip>
          <Tooltip label="Print">
            <Box>
              <ReactToPrint
                trigger={() => (
                  <Icon
                    as={MdOutlinePrint}
                    boxSize={5}
                    color="#666"
                    cursor="pointer"
                    _hover={{ color: "#ccc" }}
                    marginTop={2}
                  />
                )}
                content={() => tableRef?.current}
              />
            </Box>
          </Tooltip>
        </Flex>
        <Flex gap={1} alignItems="center">
          {retreatBookingData?.searchDateValuesLength && (
            <Text>
              {retreatBookingData?.searchDateValuesLength} of{" "}
              {retreatBookingData?.count}
            </Text>
          )}
          <Text color="grey">
            {retreatBookingData?.next?.limit &&
              `${retreatBookings.page}-${retreatBookingData?.next?.limit} of
            ${retreatBookingData?.count}`}
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              onClick={() => {
                if (retreatBookings.page) {
                  setNextPage(
                    retreatBookings.page,
                    retreatBookingData?.count,
                    "prev"
                  );
                } else {
                  setNextPage(1, retreatBookingData?.count, "prev");
                }
              }}
              isDisabled={
                retreatBookings.searchDate
                  ? true
                  : isPrevButtonDisabled(retreatBookings.page || 1)
              }
              aria-label="Pagination prev"
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Text>{retreatBookings.page ? retreatBookings.page : 1}</Text>
          <Tooltip label="Next Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              aria-label="Pagination next"
              onClick={() => {
                if (retreatBookings.page)
                  setNextPage(
                    retreatBookings.page,
                    retreatBookingData?.count,
                    "next"
                  );
                else {
                  setNextPage(1, retreatBookingData?.count, "next");
                }
              }}
              isDisabled={
                retreatBookings.searchDate
                  ? true
                  : isNextButtonDisabled(
                      retreatBookings?.page || 1,
                      retreatBookingData?.count || 1
                    )
              }
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Box>
      {isOpen && (
        <DashboardRetreatModal onClose={onClose} modalEvent={modalEvent} />
      )}
      {retreatBookingData?.results.length === 0 ? (
        <Text fontWeight={500}>Sorry, No bookings</Text>
      ) : (
        <Card mx={5} p={2}>
          <Box
            maxHeight="550px"
            overflowY="auto"
            width={{ base: "300px", md: "500px", lg: "1000px" }}
          >
            <TableContainer>
              <Table variant="simple" size="sm" ref={tableRef}>
                <Thead>
                  <Tr>
                    {header.map((item) => (
                      <Th key={item}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {retreatBookingData?.results.map((item) => (
                    <Tr>
                      <Td
                        _hover={{
                          textDecoration: "underline",
                        }}
                        cursor="pointer"
                        onClick={() => handleView(item)}
                      >
                        {item.bookingName}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.email}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.roomPreference}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.contactNumber}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.bookingForFamilyOrIndividual}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.events.title}
                      </Td>
                      <Td
                        cursor="pointer"
                        // onClick={() => handleView(item)}
                      >
                        {item.events.start}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      )}
    </>
  );
};

export default DashboardBookingRetreat;

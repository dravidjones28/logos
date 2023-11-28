import {
  Box,
  Card,
  Heading,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  HStack,
  Input,
  Flex,
  Icon,
  Select,
} from "@chakra-ui/react";
import useRetreatBookingAll from "./../hooks/dashboard/retreatBookings/useRetreatBookingAll";
import useRetreatBookingQuery from "../store";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { IoMdCloudDownload } from "react-icons/io";

const DashboardBookingRetreat = () => {
  const { data: retreatBookingData, error, isLoading } = useRetreatBookingAll();

  const setPage = useRetreatBookingQuery((s) => s.setPage);
  const setPageSize = useRetreatBookingQuery((s) => s.setPageSize);
  const setStartDate = useRetreatBookingQuery((s) => s.setStartDate);
  const setTitle = useRetreatBookingQuery((s) => s.setTitle);
  const setSearchQuery = useRetreatBookingQuery((s) => s.setSearchQuery);
  const searchOrderId = useRetreatBookingQuery((s) => s.setOrderId);

  const retreatBookingsStore = useRetreatBookingQuery((s) => s.retreatBookings);

  const [titleTemp, setTitleTemp] = useState("");
  const [dateTemp, setDateTemp] = useState("");

  const handleBooking = (value: string, type: string) => {
    if (type === "title") setTitleTemp(value);
    if (type === "date") setDateTemp(value);
  };

  console.log("Title Temp", titleTemp);
  console.log("Retreat Bookings", retreatBookingsStore);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (dateTemp.length > 0) setStartDate(dateTemp);
    if (titleTemp.length > 0) setTitle(titleTemp);
  };

  const tableRef = useRef(null);

  const uniqueEvents = Array.from(new Set(retreatBookingData?.events));

  if (error) throw error;

  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 10 }}
        mt={{ base: 5, lg: 0 }}
      >
        Retreat Booking
      </Heading>
      <Card>
        <Box
          p={5}
          display={{ base: "block", lg: "flex" }}
          justifyContent="space-between"
        >
          <Input
            type="date"
            width={{ base: "100%", lg: "300px" }}
            placeholder="Search by Date"
            value={dateTemp}
            isDisabled={isLoading ? true : false}
            onChange={(e) => {
              handleBooking(e.target.value, "date");
            }}
            mr={{ base: 0, lg: "20px" }}
          />
          <Select
            placeholder="Retreat Name"
            width={{ base: "100%", md: "200px" }}
            value={titleTemp}
            onChange={(e) => handleBooking(e.target.value, "title")}
            isDisabled={isLoading ? true : false}
          >
            <option value="all">All</option>
            {uniqueEvents
              .filter((item) => item !== "Retreat Name")
              .map((item, index) => (
                <>
                  <option value={item} key={index}>
                    {item}
                  </option>
                </>
              ))}
          </Select>
          <Button onClick={handleSearch}>Search </Button>

          <DownloadTableExcel
            filename="Retreat Bookings"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <Icon
              as={IoMdCloudDownload}
              boxSize={7}
              cursor="pointer"
              _hover={{ color: "#ccc" }}
            />
          </DownloadTableExcel>
        </Box>
        <TableContainer>
          <Table
            variant="simple"
            size={{ base: "sm", md: "md", lg: "lg" }}
            ref={tableRef}
          >
            <TableCaption>Retreat Bookings</TableCaption>
            <Thead>
              <Tr>
                <Th>Order Id </Th>
                <Th>Booking Person</Th>
                <Th>Retreat Name</Th>
                <Th>Persons</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            {isLoading ? (
              <Box>
                <Spinner />
              </Box>
            ) : (
              <Tbody>
                {retreatBookingData?.result.map((item) => {
                  const persons = Object.keys(item.persons).map(
                    (i) => item.persons[i]
                  );

                  return (
                    <>
                      <Tr>
                        <Td color="grey">{item.razorpay_order_id}</Td>
                        <Td fontWeight={500}>{item.bookingName}</Td>
                        <Td color="grey">{item.eventId.title}</Td>
                        <Td>
                          {persons.map((item) => (
                            <Text color="grey">{item}</Text>
                          ))}
                        </Td>
                        <Td color="grey">{item.eventId.start}</Td>
                        <Td color="#3182CE" isNumeric>
                          {item.amount}
                        </Td>
                      </Tr>
                    </>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default DashboardBookingRetreat;

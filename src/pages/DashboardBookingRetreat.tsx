import {
  Box,
  Card,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Input,
  Icon,
  Select,
  InputGroup,
  InputLeftElement,
  Flex,
  IconButton,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import useRetreatBookingAll from "./../hooks/dashboard/retreatBookings/useRetreatBookingAll";
import useRetreatBookingQuery from "../store";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { IoMdCloudDownload } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const DashboardBookingRetreat = () => {
  const { data: retreatBookingData, error, isLoading } = useRetreatBookingAll();

  const setPage = useRetreatBookingQuery((s) => s.setPage);
  const setPageSize1 = useRetreatBookingQuery((s) => s.setPageSize);
  const setSearchQuery = useRetreatBookingQuery((s) => s.setSearchQuery);
  const setTitle = useRetreatBookingQuery((s) => s.setTitle);

  const retreatBookingsStore = useRetreatBookingQuery((s) => s.retreatBookings);

  const [titleTemp, setTitleTemp] = useState("");
  const [searchName, setSearchName] = useState("");
  const [limitTemp, setLimitTemp] = useState(10);

  const handleBooking = (value: string, type: string) => {
    if (type === "title") {
      setTitleTemp(value);
      setSearchName("");
    } else if (type === "searchQuery") {
      setTitleTemp("");
      setSearchName(value);
    } else if (type === "limit") {
      setLimitTemp(Number(value));
    }
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (searchName) {
    setSearchQuery(searchName);
    setTitle("all");
    // }
    if (limitTemp > 0) {
      setPageSize1(limitTemp);
    }
    if (titleTemp.length > 0) {
      setTitle(titleTemp);
    }
  };

  const tableRef = useRef(null);
  const uniqueEvents = Array.from(new Set(retreatBookingData?.events));

  const handleNext = (value: number, totalPages: number | undefined) => {
    const nextPage = Math.min(value + 1, totalPages ? totalPages : 0);
    setPage(nextPage);
  };

  const handlePrev = (value: number) => {
    const prevPage = Math.max(value - 1, 1);
    setPage(prevPage);
  };
  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    page * limitTemp >= totalCount;

  if (error) throw error;

  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 5 }}
        mt={{ base: 5, lg: 0 }}
      >
        Retreat Booking
      </Heading>
      <Card mb={20}>
        <Box
          p={5}
          display={{ base: "block", lg: "flex" }}
          justifyContent="space-between"
        >
          <Select
            // placeholder="Retreat Name"
            width={{ base: "100%", md: "200px" }}
            value={titleTemp}
            onChange={(e) => handleBooking(e.target.value, "title")}
            isDisabled={isLoading ? true : false}
          >
            {!uniqueEvents.includes("Retreat Name") && (
              <option value="all">All</option>
            )}
            {uniqueEvents
              .filter((item) => item !== "Retreat Name")
              .map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
          </Select>
          <InputGroup width={{ base: "100%", md: "300px" }}>
            <InputLeftElement>
              <Icon as={CiSearch} color="#5664d2" />
            </InputLeftElement>
            <Input
              onChange={(e) => handleBooking(e.target.value, "searchQuery")}
              type="text"
              size="md"
              value={searchName}
              _placeholder={{
                opacity: 1,
                color: "gray.500",
                fontSize: "15px",
              }}
              placeholder="Search by Name"
            />
          </InputGroup>
          <Select
            // placeholder="Retreat Name"
            width={{ base: "100%", md: "200px" }}
            value={limitTemp}
            onChange={(e) => handleBooking(e.target.value, "limit")}
            isDisabled={isLoading ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
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
        <Box height="350px" overflowY="auto">
          <Table variant="simple" size={{ base: "sm" }} ref={tableRef}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Booking Person Name</Th>
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
            ) : retreatBookingData?.result.length === 0 ? (
              <Center>
                <Text fontWeight={500}>There are no retreat bookings</Text>
              </Center>
            ) : (
              <Tbody>
                {retreatBookingData?.result.map((item, index) => {
                  const persons = Object.keys(item.persons).map(
                    (i) => item.persons[i]
                  );

                  return (
                    <>
                      <Tr key={index}>
                        <Td fontWeight={500}>{index + 1}</Td>
                        {/* <Td fontWeight={500}>{item.firstname}</Td> */}
                        <Td color="grey">{item.events.title}</Td>
                        <Td>
                          {persons.map((per) => (
                            <Text color="grey">{per}</Text>
                          ))}
                        </Td>
                        <Td color="grey">{item.events.start}</Td>
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
        </Box>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="Previous Page">
              <IconButton
                bg="#fff"
                _hover={{ bg: "#fff" }}
                onClick={() => {
                  if (retreatBookingsStore.page) {
                    handlePrev(retreatBookingsStore.page);
                  } else {
                    handlePrev(1);
                  }
                }}
                isDisabled={isPrevButtonDisabled(
                  retreatBookingsStore.page || 1
                )}
                aria-label="Pagination prev"
                icon={<ChevronLeftIcon h={6} w={6} />}
                mr={4}
              />
            </Tooltip>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Text mr={3}>
                {retreatBookingsStore.page ? retreatBookingsStore.page : 1}
              </Text>
            </Box>
            <Tooltip label="Next Page">
              <IconButton
                bg="#fff"
                _hover={{ bg: "#fff" }}
                aria-label="Pagination next"
                onClick={() => {
                  if (retreatBookingsStore.page) {
                    handleNext(
                      retreatBookingsStore.page,
                      retreatBookingData?.totalCount
                    );
                  } else {
                    handleNext(1, retreatBookingData?.totalCount);
                  }
                }}
                isDisabled={isNextButtonDisabled(
                  retreatBookingsStore?.page || 1,
                  retreatBookingData?.totalCount || 1
                )}
                // isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default DashboardBookingRetreat;

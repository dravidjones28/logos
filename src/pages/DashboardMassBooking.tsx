import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  Flex,
  IconButton,
  Tooltip,
  Card,
  Heading,
  Select,
  Center,
  Icon,
} from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import useMassBookingAll from "../hooks/dashboard/massBookings/useMassBooking";
import useMassBookingQuery from "../store";
import { useMemo, useRef, useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import TableComp from "../components/Tables/TableComp";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { downloadExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa";

type Item = {
  firstname: string;
  normalIntentionField: string;
  normalIntentionTypes: string;
  gregorianIntentionField: string;
  massDate: string;
};

const DashboardMassBooking = () => {
  const { data: massBookingData, error, isLoading } = useMassBookingAll();

  const massBooking = useMassBookingQuery((s) => s.massBookings);
  const setMassDate = useMassBookingQuery((s) => s.setMassDate);
  const [selectedDateTemp, setSelectedDateTemp] = useState<string>("");
  const setNextPage = useMassBookingQuery((s) => s.setMassPage);
  const setMassPageSize = useMassBookingQuery((s) => s.setMassPageSize);
  const setMassPage = useMassBookingQuery((s) => s.setMassPage);
  const [limitTemp, setLimitTemp] = useState(5);

  const handleChange = (e: any) => {
    const dateObject = new Date(e.target.value);
    setSelectedDateTemp(e.target.value);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObject
    );
    setMassDate(formattedDate);
    setMassPage(1);
  };

  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Booking Person Name",
        cell: (row) => row.renderValue(),
        accessorKey: "firstname",
      },
      {
        header: "Normal Intentions",
        cell: (row) => row.renderValue(),
        accessorKey: "normalIntentionField",
      },
      {
        header: "Normal Intention Type",
        cell: (row) => row.renderValue(),
        accessorKey: "normalIntentionTypes",
      },
      {
        header: "Gregorian Intention",
        cell: (row) => row.renderValue(),
        accessorKey: "gregorianIntentionField",
      },
      {
        header: "Date",
        cell: (row) => row.renderValue(),
        accessorKey: "massDate",
      },
    ],
    []
  );

  const handleNext = (value: number, totalPages: number | undefined) => {
    const nextPage = Math.min(value + 1, totalPages ? totalPages : 0);
    setNextPage(nextPage);
  };

  const handlePrev = (value: number) => {
    const prevPage = Math.max(value - 1, 1);
    setNextPage(prevPage);
  };

  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    page * limitTemp >= totalCount;

  const filterResult = massBookingData?.result.map(
    ({
      firstname,
      normalIntentionField,
      normalIntentionTypes,
      gregorianIntentionField,
      massDate,
    }) => ({
      firstname,
      normalIntentionField,
      normalIntentionTypes,
      gregorianIntentionField,
      massDate,
    })
  );
  const tableRef = useRef<any>(null);
  const header = [
    "Booking Person Name",
    "Normal Intentions",
    "Normal Intention Type",
    "Gregorian Intention",
    "Date",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Mass Bookings",
      sheet: "users",
      tablePayload: {
        header,
        // accept two different data structures
        body: filterResult ? filterResult : [],
      },
    });
  }

  if (isLoading)
    return (
      <LGBox>
        <Spinner />
      </LGBox>
    );

  if (error) throw error;

  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 5 }}
        mt={{ base: 5, lg: 0 }}
      >
        Mass Booking
      </Heading>
      <Card mb={20} p={4}>
        <Box
          display={{ base: "block", lg: "flex" }}
          gap={{ base: "20px" }}
          my={5}
        >
          <Button
            display={{ base: "block", lg: "flex" }}
            onClick={() => {
              setMassDate("");
              setSelectedDateTemp("");
            }}
            size="sm"
            mb={{ base: "15px", lg: "0" }}
          >
            All
          </Button>
          <Input
            value={selectedDateTemp}
            type="date"
            width="200px"
            onChange={handleChange}
            size="sm"
            mb={{ base: "15px", lg: "0" }}
          />

          <Icon
            as={FaDownload}
            boxSize={4}
            color="#666"
            cursor="pointer"
            _hover={{ color: "#ccc" }}
            onClick={handleDownloadExcel}
          />
        </Box>
        {filterResult?.length === 0 ? (
          <Center>
            <Text>Sorry, No mass bookings</Text>
          </Center>
        ) : (
          <div ref={tableRef}>
            <TableComp data={filterResult ? filterResult : []} columns={cols} />
          </div>
        )}
        <Flex gap={4} alignItems="center">
          <Flex gap={1} alignItems="center">
            <Tooltip label="Previous Page">
              <IconButton
                bg="#fff"
                _hover={{ bg: "#fff" }}
                onClick={() => {
                  if (massBooking.page) {
                    handlePrev(massBooking.page);
                  } else {
                    handlePrev(1);
                  }
                }}
                isDisabled={isPrevButtonDisabled(massBooking.page || 1)}
                aria-label="Pagination prev"
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
            <Text>{massBooking.page ? massBooking.page : 1}</Text>
            <Tooltip label="Next Page">
              <IconButton
                bg="#fff"
                _hover={{ bg: "#fff" }}
                aria-label="Pagination next"
                onClick={() => {
                  if (massBooking.page) {
                    handleNext(massBooking.page, massBookingData?.totalCount);
                  } else {
                    handleNext(1, massBookingData?.totalCount);
                  }
                }}
                isDisabled={isNextButtonDisabled(
                  massBooking?.page || 1,
                  massBookingData?.totalCount || 1
                )}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>
          <Select
            // placeholder="Retreat Name"
            width={{ base: "100%", md: "200px" }}
            value={massBooking.pageSize}
            onChange={(e) => {
              setLimitTemp(Number(e.target.value));
              setMassPageSize(Number(e.target.value));
              setMassPage(1);
            }}
            size="sm"
            isDisabled={isLoading ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </Select>
        </Flex>
      </Card>
    </>
  );
};

export default DashboardMassBooking;

import {
  Text,
  Heading,
  Spinner,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import useMassBooking from "../hooks/dashboard/massBookings/useMassBooking";
import useMassBookingQuery from "../store";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { downloadExcel } from "react-export-table-to-excel";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaDownload } from "react-icons/fa";
import TableComp from "../components/Tables/TableComp";

interface Item {
  bookingName: string;
  massDate: string[];
  massType: string;
  normalIntentionField: string;
  normalIntentionTypes: string;
  gregorianIntentionField: string;
}
const DashboardMassBooking = () => {
  const { data: massBookingData, error, isLoading } = useMassBooking();

  const massBooking = useMassBookingQuery((s) => s.massBookings);
  const setMassDate = useMassBookingQuery((s) => s.setMassDate);
  const setNextPage = useMassBookingQuery((s) => s.setMassPage);
  const setMassPageSize = useMassBookingQuery((s) => s.setMassPageSize);
  const setMassPage = useMassBookingQuery((s) => s.setMassPage);

  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    massBooking.pageSize ? page * massBooking?.pageSize >= totalCount : false;

  const formatMassDate = (massDate: string[]) => massDate.join(", ");
  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Booking Name",
        cell: (row) => row.renderValue(),
        accessorKey: "bookingName",
      },
      {
        header: "Mass type",
        cell: (row) => row.renderValue(),
        accessorKey: "massType",
      },
      {
        header: "Normal Intention",
        cell: (row) => row.renderValue(),
        accessorKey: "normalIntentionField",
      },
      {
        header: "Gregorian Intention",
        cell: (row) => row.renderValue(),
        accessorKey: "gregorianIntentionField",
      },
      {
        header: "Type",
        cell: (row) => row.renderValue(),
        accessorKey: "normalIntentionTypes",
      },
      {
        header: "Dates",
        accessorKey: "massDate",
        // Cell: ({ value }: { value: Date[] }) => (
        //   <span>{formatMassDate(value)}</span>
        // ),
        Cell: ({ value }: { value: string[] }) => (
          <Box>
            {value.map((date, index) => (
              <>
                <div key={index}>{formatMassDate([date])}</div>
              </>
            ))}
          </Box>
        ),
      },
    ],
    []
  );

  const header = [
    "Booking Name",
    "Mass type",

    "Normal Intention",
    "Gregorian Intention",
    "Type",
    "Dates",
  ];

  function handleDownloadExcel() {
    const transformedBody = (massBookingData?.results || []).map((item) => ({
      bookingName: item.bookingName,
      massType: item.massType,
      normalIntentionField: item.normalIntentionField,
      gregorianIntentionField: item.gregorianIntentionField,
      normalIntentionTypes: item.normalIntentionTypes,
      massDate: item.massDate.join(", "),
    }));
    downloadExcel({
      fileName: "Mass Bookings",
      sheet: "Pr",
      tablePayload: {
        header,
        body: transformedBody,
      },
    });
  }
  if (isLoading) return <Spinner />;
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
            value={massBooking.pageSize}
            onChange={(e) => {
              setMassPageSize(Number(e.target.value));
            }}
            size="sm"
            isDisabled={isLoading || massBooking.searchDate ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </Select>
          <Input
            value={massBooking.searchDate}
            type="date"
            width="200px"
            onChange={(e) => setMassDate(e.target.value)}
            size="sm"
            mb={{ base: "15px", lg: "0" }}
          />
          <Button
            size="sm"
            onClick={() => {
              setMassDate("");
              setMassPage(0, massBookingData?.count, "next");
              setMassPageSize(10);
            }}
          >
            All
          </Button>
          <Icon
            as={FaDownload}
            boxSize={4}
            color="#666"
            cursor="pointer"
            _hover={{ color: "#ccc" }}
            marginTop={2}
            onClick={handleDownloadExcel}
          />
        </Flex>
        <Flex gap={1} alignItems="center">
          {massBookingData?.searchDateValuesLength && (
            <Text>
              {massBookingData?.searchDateValuesLength} of{" "}
              {massBookingData?.count}
            </Text>
          )}
          <Text color="grey">
            {massBookingData?.next?.limit &&
              `${massBooking.page}-${massBookingData?.next?.limit} of
            ${massBookingData?.count}`}
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              onClick={() => {
                if (massBooking.page) {
                  setNextPage(massBooking.page, massBookingData?.count, "prev");
                } else {
                  setNextPage(1, massBookingData?.count, "prev");
                }
              }}
              isDisabled={
                massBooking.searchDate
                  ? true
                  : isPrevButtonDisabled(massBooking.page || 1)
              }
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
                if (massBooking.page)
                  setNextPage(massBooking.page, massBookingData?.count, "next");
                else {
                  setNextPage(1, massBookingData?.count, "next");
                }
              }}
              isDisabled={
                massBooking.searchDate
                  ? true
                  : isNextButtonDisabled(
                      massBooking?.page || 1,
                      massBookingData?.count || 1
                    )
              }
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Box>
      <TableComp
        data={massBookingData?.results ? massBookingData?.results : []}
        columns={cols}
      />
    </>
  );
};

export default DashboardMassBooking;

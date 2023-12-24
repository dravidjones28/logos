import {
  Text,
  Heading,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Tooltip,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaDownload } from "react-icons/fa";
import TableComp from "../components/Tables/TableComp";
import usePrayerRequestAll from "../hooks/dashboard/prayerRequest/usePrayerRequest";
import usePrayerRequestQuery from "../store";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { downloadExcel } from "react-export-table-to-excel";

interface Item {
  fullName?: string;
  email?: string;
  message?: string;
}

const DashboardPrayerRequest = () => {
  const { data: prayerRequestData, error, isLoading } = usePrayerRequestAll();

  const prayerRequest = usePrayerRequestQuery((s) => s.prayerRequest);
  const setPrayerRequestDate = usePrayerRequestQuery(
    (s) => s.setPrayerRequestDate
  );
  const setNextPage = usePrayerRequestQuery((s) => s.setPrayerRequestPage);
  const setPrayerRequestLimit = usePrayerRequestQuery(
    (s) => s.setPrayerRequestPageSize
  );
  const setPrayerRequestPage = usePrayerRequestQuery(
    (s) => s.setPrayerRequestPage
  );

  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    prayerRequest.pageSize
      ? page * prayerRequest?.pageSize >= totalCount
      : false;

  const cols = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "fullName",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
      {
        header: "Prayer Request",
        cell: (row) => row.renderValue(),
        accessorKey: "message",
      },
    ],
    []
  );

  const header = ["Full Name", "Email", "Message"];

  function handleDownloadExcel() {
    const transformedBody = (prayerRequestData?.results || []).map((item) => ({
      fullName: item.fullName,
      email: item.email,
      message: item.message,
      // Add other properties as needed
    }));
    downloadExcel({
      fileName: "Prayer Requests",
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
        Prayer Request
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
            value={prayerRequest.pageSize}
            onChange={(e) => {
              setPrayerRequestLimit(Number(e.target.value));
            }}
            size="sm"
            isDisabled={isLoading || prayerRequest.searchDate ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </Select>
          <Input
            value={prayerRequest.searchDate}
            type="date"
            width="200px"
            onChange={(e) => setPrayerRequestDate(e.target.value)}
            size="sm"
            mb={{ base: "15px", lg: "0" }}
          />
          <Button
            size="sm"
            onClick={() => {
              setPrayerRequestDate("");
              setPrayerRequestPage(0, prayerRequestData?.count, "next");
              setPrayerRequestLimit(10);
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
          {prayerRequestData?.searchDateValuesLength && (
            <Text>
              {prayerRequestData?.searchDateValuesLength} of{" "}
              {prayerRequestData?.count}
            </Text>
          )}
          <Text color="grey">
            {prayerRequestData?.next?.limit &&
              `${prayerRequest.page}-${prayerRequestData?.next?.limit} of
            ${prayerRequestData?.count}`}
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              onClick={() => {
                if (prayerRequest.page) {
                  setNextPage(
                    prayerRequest.page,
                    prayerRequestData?.count,
                    "prev"
                  );
                } else {
                  setNextPage(1, prayerRequestData?.count, "prev");
                }
              }}
              isDisabled={
                prayerRequest.searchDate
                  ? true
                  : isPrevButtonDisabled(prayerRequest.page || 1)
              }
              aria-label="Pagination prev"
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Text>{prayerRequest.page ? prayerRequest.page : 1}</Text>
          <Tooltip label="Next Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              aria-label="Pagination next"
              onClick={() => {
                if (prayerRequest.page)
                  setNextPage(
                    prayerRequest.page,
                    prayerRequestData?.count,
                    "next"
                  );
                else {
                  setNextPage(1, prayerRequestData?.count, "next");
                }
              }}
              isDisabled={
                prayerRequest.searchDate
                  ? true
                  : isNextButtonDisabled(
                      prayerRequest?.page || 1,
                      prayerRequestData?.count || 1
                    )
              }
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Box>
      <TableComp
        data={prayerRequestData?.results ? prayerRequestData?.results : []}
        columns={cols}
      />
    </>
  );
};

export default DashboardPrayerRequest;

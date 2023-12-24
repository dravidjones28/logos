import { Text, Heading } from "@chakra-ui/react";

const DashboardMassBooking = () => {
  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 5 }}
        mt={{ base: 5, lg: 0 }}
      >
        Mass Booking
      </Heading>
      <Text>This website page is under construction</Text>
      {/* <Card mb={20} p={4}>
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
            <Text fontWeight={500}>Sorry, No mass bookings</Text>
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
      </Card> */}
    </>
  );
};

export default DashboardMassBooking;

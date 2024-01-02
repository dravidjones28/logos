import {
  SimpleGrid,
  Icon,
  Box,
  Spinner,
  // Grid,
  // GridItem,
  // Card,
  // Text,
} from "@chakra-ui/react";
import {
  BiSolidChurch,
  BiSolidUser,
  //  BiRupee
} from "react-icons/bi";
import { GiTicket } from "react-icons/gi";
import { PiHandsPrayingLight } from "react-icons/pi";
import DashboardCard from "./DashboardCard";
import useDashboard from "../../hooks/dashboard/useDashboard";
// import BarChart from "./BarChart";

const DashboardStats = () => {
  const { data: stats, isLoading, error } = useDashboard();

  if (isLoading)
    return (
      <Box
        display="flex"
        height="70vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    );

  if (error || !stats) throw error;


  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 4 }} spacing={5} gap={10}>
        <DashboardCard
          title=" Today's Retreat Booking"
          stats={stats.retreatBookingToday.count}
          icon={<Icon boxSize={6} as={GiTicket} color="#fff" />}
          statArrow={
            stats.retreatBookingToday.stats < 3 ? "decrease" : "increase"
          }
          statValue={stats.retreatBookingToday.stats}
        />
        <DashboardCard
          title=" Today's Mass Booking"
          stats={stats.massBookingToday.count}
          icon={<Icon boxSize={6} as={BiSolidChurch} color="#fff" />}
          statArrow={stats.massBookingToday.stats < 3 ? "decrease" : "increase"}
          statValue={stats.massBookingToday.stats}
        />
        <DashboardCard
          title=" Today's User"
          stats={stats.usersToday.count}
          icon={<Icon boxSize={6} as={BiSolidUser} color="#fff" />}
          statArrow={stats.usersToday.stats < 3 ? "decrease" : "increase"}
          statValue={stats.usersToday.stats}
        />
        <DashboardCard
          title=" Today's Prayer Request"
          stats={stats.prayerRequestToday.count}
          icon={<Icon boxSize={6} as={PiHandsPrayingLight} color="#fff" />}
          statArrow={
            stats.prayerRequestToday.stats < 3 ? "decrease" : "increase"
          }
          statValue={stats.prayerRequestToday.stats}
        />
      </SimpleGrid>
      {/* <Grid
        mt={10}
        templateAreas={{
          base: `"graph" "main1" "main2"`,
          lg: `"graph" "main1 main2"`,
          xl: `"graph main1" "graph main2"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr",
          xl: "47.5% 1fr",
        }}
        // h="200px"
        gap={10}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"graph"}>
          <Card p={5}>
            <Text fontWeight={500}>Bookings</Text>
            <BarChart data={stats.retreatBookingToday.graph} />
          </Card>
        </GridItem>
        <GridItem pl="2" area={"main1"}>
          <DashboardCard
            costName={true}
            title="Today's Booking Cost"
            stats={stats.retreatBookingToday.cost}
            icon={<Icon boxSize={6} as={BiRupee} color="#fff" />}
            statArrow={
              stats.retreatBookingToday.stats < 3 ? "decrease" : "increase"
            }
            statValue={stats.retreatBookingToday.stats}
          />
        </GridItem>
        <GridItem pl="2" area={"main2"}>
          <DashboardCard
            costName={true}
            title=" Today's Mass Booking Cost"
            stats={stats.massBookingToday.cost}
            icon={<Icon boxSize={6} as={BiRupee} color="#fff" />}
            statArrow={
              stats.massBookingToday.stats < 3 ? "decrease" : "increase"
            }
            statValue={stats.massBookingToday.stats}
          />
        </GridItem>
      </Grid>
      <Grid
        mt={10}
        templateAreas={{
          base: `"main1" "main2" "graph"`,
          lg: `"main1 main2" "graph" `,
          xl: `"main1 graph" "main2 graph"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr",
          xl: "1fr 47.5% ",
        }}
        // h="200px"
        gap={10}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"graph"}>
          <Card p={5}>
            <Text fontWeight={500}>Bookings</Text>
            <BarChart data={stats.retreatBookingToday.graph} />
          </Card>
        </GridItem>
        <GridItem pl="2" area={"main1"}>
          <DashboardCard
            costName={true}
            title="Retreat Booking Month Cost"
            stats={stats.retreatBookingToday.monthCost}
            icon={<Icon boxSize={6} as={BiRupee} color="#fff" />}
            statArrow={
              stats.retreatBookingToday.stats < 3 ? "decrease" : "increase"
            }
            statValue={stats.retreatBookingToday.stats}
          />
        </GridItem>
        <GridItem pl="2" area={"main2"}>
          <DashboardCard
            costName={true}
            title=" Mass Booking Month Cost"
            stats={stats.massBookingToday.monthCost}
            icon={<Icon boxSize={6} as={BiRupee} color="#fff" />}
            statArrow={
              stats.massBookingToday.stats < 3 ? "decrease" : "increase"
            }
            statValue={stats.massBookingToday.stats}
          />
        </GridItem>
      </Grid> */}
    </>
  );
};

export default DashboardStats;

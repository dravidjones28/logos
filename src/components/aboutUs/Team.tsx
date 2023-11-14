import { Heading, SimpleGrid, Box, Text } from "@chakra-ui/react";
import TeamComponent from "./TeamComponent";
const Team = () => {
  const team1 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp";

  const team2 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694878855/Logos%20Retreat%20Centre/Fr.-Vetta_nhthov.webp";

  const team3 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694878137/Logos%20Retreat%20Centre/Fr.-Joseph-Thattarukudiyil_1_xfmoo9.webp";

  const team4 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694877759/Logos%20Retreat%20Centre/Fr.-George-Pallickamyalil_wfaimo.webp";

  const team5 =
    "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695020307/Logos%20Retreat%20Centre/Fr.-Var_pksgbr.webp";
  return (
    <Box
      bg="#3e3e45"
      py={{ base: "20px", lg: "60px" }}
      px={{ base: "10px", lg: "70px" }}
      //   height="100%"
    >
      <Heading fontSize={{ base: "2xl", lg: "3xl" }} color="#fff">
        The Hearts Behind the Altar: Our Priests
      </Heading>
      <Text fontSize="18px" color="#fff" maxWidth="600px" mt={3}>
        Learn more about the priests who illuminate our path to spiritual
        enlightenment, healing, and deepened faith.
      </Text>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5} gap={10} my={20}>
        <TeamComponent
          title="Rev. Fr. Dr. Jose Vettiyankal VC"
          subtitle="Director"
          image={team1}
          desc="  Artist is a term applied to a person who engages in an
              activity deemed to be an art."
        />
        <TeamComponent
          title="Rev. Fr. Vettaparambil George VC"
          subtitle="Assistant Director"
          image={team2}
          desc="Artist is a term applied to a person who engages in an activity deemed to be an art."
        />
        <TeamComponent
          title="Rev. Fr. Joseph Thattarukudiyil VC"
          subtitle="Incharge"
          image={team3}
          desc="Artist is a term applied to a person who engages in an activity deemed to be an art."
        />
        <TeamComponent
          title="Rev. Fr. George Pallikamyalil VC"
          subtitle="Coordinator"
          image={team4}
          desc="Artist is a term applied to a person who engages in an activity deemed to be an art."
        />
        <TeamComponent
          title="Rev. Fr. Varghese Thomas VC"
          subtitle="Coordinator"
          image={team5}
          desc="Artist is a term applied to a person who engages in an activity deemed to be an art."
        />
      </SimpleGrid>
    </Box>
  );
};

export default Team;

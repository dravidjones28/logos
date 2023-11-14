import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";

const priestsData = [
  {
    name: "Rev. Fr. Dr. Jose Vettiyankal VC",
    url: "fr-jose-vettiyankal",
    description: "Elegance is the end result of hard work...",
    imageUrl:
      "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694873905/Logos%20Retreat%20Centre/Fr-Jose_gsxzmr.webp",
  },

  {
    name: "Rev. Fr. Vettaparambil George VC",
    url: "fr-vettaparambil-george",
    description: "Elegance is the end result of hard work...",
    imageUrl:
      "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694878855/Logos%20Retreat%20Centre/Fr.-Vetta_nhthov.webp",
  },

  {
    name: "Rev. Fr. Joseph Thattarukudiyil VC",
    url: "fr-joseph-thattarukudiyil",
    description: "Elegance is the end result of hard work...",
    imageUrl:
      "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694878137/Logos%20Retreat%20Centre/Fr.-Joseph-Thattarukudiyil_1_xfmoo9.webp",
  },

  {
    name: "Rev. Fr. George Pallikamyalil VC",
    url: "fr-george-pallickamyalil",
    description: "Elegance is the end result of hard work...",
    imageUrl:
      "https://res.cloudinary.com/dxdpahm3o/image/upload/v1694877759/Logos%20Retreat%20Centre/Fr.-George-Pallickamyalil_wfaimo.webp",
  },

  {
    name: "Rev. Fr. Varghese Thomas VC",
    url: "fr-varghese-thomas",
    description: "Elegance is the end result of hard work...",
    imageUrl:
      "https://res.cloudinary.com/dxdpahm3o/image/upload/v1695020307/Logos%20Retreat%20Centre/Fr.-Var_pksgbr.webp",
  },
];
const PriestTeam = () => {
  return (
    <>
      {priestsData.map((item, index) => (
        <Card key={index}>
          <CardBody>
            <Image src={item.imageUrl} alt={item.url} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{item.name}</Heading>
              <Text>{item.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default PriestTeam;

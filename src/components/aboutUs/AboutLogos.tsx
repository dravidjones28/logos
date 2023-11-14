import { Heading, Text, Box } from "@chakra-ui/react";
import CardKnowMore from "./CardKnowMore";

const AboutLogos = () => {
  return (
    <>
      <Box>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }} fontWeight={500}>
          About Logos Retreat Center
        </Heading>
        <Text mt={5} fontSize="18px">
          At Logos Retreat Center, we dedicate ourselves to continuing the
          divine ministry of Jesus Christ through an array of spiritual programs
          and retreats. Nestled in the tranquil suburb of Horamavu in Bangalore,
          our Centre is a haven for those seeking spiritual renewal, salvation,
          and the love of God. We host residential retreats every week, along
          with Bible conventions every Friday, Saturday, and Sunday,
          accommodating various languages including Kannada, English, Malayalam,
          and Tamil.
          <br />
          <br />
          Founded by the Vincentian Congregation, our mission is inspired by a
          deep commitment to spiritual growth, faith, and compassion. Our
          director, Rev Dr. Jose Vettiyankal VC, has spread the message of faith
          and divine mercy across the globe. Under his guidance, we extend a
          warm invitation to all who wish to experience the infilling of the
          Holy Spirit, and embrace the cross of Christ.
          <br />
          <br />
          At Logos, you are not just attending a retreat; you are embracing an
          experience that nurtures your soul, strengthens your faith, and brings
          you closer to God
        </Text>
      </Box>
      <CardKnowMore
        bgImage="https://res.cloudinary.com/dxdpahm3o/image/upload/v1694609872/Logos%20Retreat%20Centre/Established_Logos.webp"
        title=" Unveil The Power Of Prayer And Healing"
        subtitle=" A glimpse of the sacred grounds where countless lives have been
      touched and transformed."
        buttonName="contact us"
        href="/contactUs"
      />
    </>
  );
};

export default AboutLogos;

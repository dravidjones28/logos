"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Card,
  Box,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import LGBox from "../components/common/LGBox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  title: string;
  subtitle: string;
}

function Faq() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LGBox>
      <Box height="100%" bg="#eef0f3">
        <Box pt="40px">
          <Card borderRadius="10px" mx={{ base: "20px", lg: "145px" }}>
            <Box borderRadius="10px" bg="#3993ee" width="100%" px={5} py={8}>
              <Text fontSize="3xl" color="#fff" fontWeight={500}>
                FAQ
              </Text>
              <Text color="#fff">Last modified: 14 Sep 2023</Text>
            </Box>
            <Box mx={{ base: "20px", lg: "40px" }}>
              <Text fontWeight={500} fontSize="20px" mb={5} mt={10}>
                Basics
              </Text>
              <AccordionComponent
                title="What is Logos Retreat Center known for?"
                subtitle="Logos is renowned for its healing and deliverance ministries, substantiated by
                    numerous testimonies of spiritual renewal and transformation."
              />
              <AccordionComponent
                title="Where is Logos Retreat Center located?"
                subtitle=" Our address is 1 No 29, Prakruthi Township, Ist Main, Babusahibpalaya, Hormavu
          P.O, Bengaluru - 560 113."
              />
              <AccordionComponent
                title="What are your contact details?"
                subtitle="  You can email us at logosblr@gmail.com. For general inquiries, you can call +91
          6366609505 between 6:30 AM and 9:30 PM. Our office numbers are +91 9742234234
          and +91 6364068544. For Logos Voice, call +91 6364068550."
              />
              <Text fontWeight={500} fontSize="20px" mb={5} mt={7}>
                Account & Booking
              </Text>
              <AccordionComponent
                title="How can I book a retreat?"
                subtitle="   To book a retreat, go to the 'Book a Retreat' section on our website
          and complete the booking process."
              />
              <AccordionComponent
                title="Can I change my retreat dates after booking?"
                subtitle=" Unfortunately, date changes are not possible due to the limited availability of
          seats and the fact that many people book their spots in advance."
              />
              <Text fontWeight={500} fontSize="20px" mb={5} mt={7}>
                Billing & Payments
              </Text>
              <AccordionComponent
                title="How do I make a payment for the retreat?"
                subtitle="You can make a payment online through our website. We accept various payment
          methods such as UPI, credit and debit cards. All payments are processed securely
          through Paytm."
              />
              <AccordionComponent
                title="Is my payment secure?"
                subtitle="Yes, your payment is secure. We use Paytm as our payment gateway, which follows
          industry-standard encryption protocols to ensure the security of your
          transactions."
              />
              <AccordionComponent
                title="Can I book online and pay later at the retreat center?"
                subtitle="No, booking is only confirmed once the payment is received. To secure your spot
          in a retreat, you must complete the payment online."
              />
              <AccordionComponent
                title="Can I pay at the retreat centre on the day of the retreat?"
                subtitle=" While you can pay at the retreat centre, doing so won't guarantee you a
          spot in the retreat. This would be considered a walk-in entry. If we have
          available seats, you may pay and join on the spot."
              />
              <AccordionComponent
                title="Is my payment refundable if I can't make it to the retreat?"
                subtitle="No, we do not offer refunds for missed retreats. Please make sure you can attend
          the retreat before making a payment, as seats are limited."
              />
              <AccordionComponent
                title="What happens to my payment if the retreat is cancelled by Logos Retreat Center?"
                subtitle="In the rare case that we have to cancel a retreat, we will offer you the option
          to transfer your payment to another retreat date or receive a full refund."
              />

              <Text fontWeight={500} fontSize="20px" mb={5} mt={7}>
                Retreat Experience
              </Text>
              <AccordionComponent
                title="Are these stay-in retreats? Can I stay elsewhere?"
                subtitle="Our retreats are designed as residential experiences. Staying outside is not an
          option as the retreat involves intensive programs that require full
          participation."
              />
              <AccordionComponent
                title="Is confession available during the retreat?"
                subtitle="Yes, confession is part of each retreat."
              />
              <AccordionComponent
                title="What are the daily mass timings?"
                subtitle="Daily mass is held from Mon-Sat at 6:00 AM and 4:30 PM."
              />
              <AccordionComponent
                title="Do you have spiritual counselors?"
                subtitle="Yes, our retreat center features trained spiritual counselors, including both
          priests and lay missionaries."
              />
              <Text fontWeight={500} fontSize="20px" mb={5} mt={7}>
                Food & Amenities
              </Text>
              <AccordionComponent
                title="What kind of food is served during the retreat?"
                subtitle="We serve simple meals, with both vegetarian and non-vegetarian options. We do
          not offer specialized diet food."
              />
              <AccordionComponent
                title="Do you have a cafeteria?"
                subtitle="Yes, we have a cafeteria that serves snacks and beverages."
              />
              <AccordionComponent
                title="Do you have a gift shop?"
                subtitle="Yes, we have a gift shop that sells religious items, books, and souvenirs."
              />
              <AccordionComponent
                title="Is parking available?"
                subtitle="Yes, we have sample parking space for cars and two-wheelers."
              />
              <Text fontWeight={500} fontSize="20px" mb={5} mt={7}>
                Additional Information
              </Text>
              <AccordionComponent
                title="What should I bring to the retreat?"
                subtitle="We recommend that you bring a Bible, a rosary, a notebook, and a pen. You must
          also bring your own toiletries and towels. We provide bedding and blankets."
              />
              <AccordionComponent
                title="What should I wear to the retreat?"
                subtitle="We recommend that you wear modest, comfortable clothing. Please avoid shorts,
          sleeveless tops, and revealing clothing."
              />
              <AccordionComponent
                title="Do you have laundry facilities?"
                subtitle="No, we do not have laundry facilities available."
              />
              <AccordionComponent
                title="Are seats limited for each retreat?"
                subtitle="Yes, seats are limited. We recommend that you book your spot in advance."
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </LGBox>
  );
}

const AccordionComponent = ({ title, subtitle }: Props) => {
  return (
    <>
      <Accordion allowMultiple width="100%">
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">{title}</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.600">{subtitle}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Faq;

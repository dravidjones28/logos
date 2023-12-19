import {
  useColorModeValue,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Box,
  Image,
  chakra,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import LogoDark from "../../assets/logo-dark.svg";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

interface Props {
  label: string;
  url: string;
}
interface FooterList {
  title: String;
  listItems: Props[];
}

const FooterList = ({ title, listItems }: FooterList) => {
  const navigate = useNavigate();
  return (
    <Stack align={"flex-start"}>
      <ListHeader>{title}</ListHeader>
      <List>
        {listItems.map((item, index) => (
          <ListItem
            onClick={() => navigate(`${item.url}`)}
            style={{ cursor: "pointer", fontSize: "15px" }}
            key={index}
          >
            {item.label}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

const Footer = () => {
  return (
    <Box
      pt={{ base: 10, lg: 5 }}
      bg={"#EFF1F4"}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Box
                display={{ base: "flex", lg: "block" }}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={LogoDark} width="70px" />
                <Text fontWeight={700} fontSize="1rem" color="rgb(52, 71, 103)">
                  Logos Retreat Center
                </Text>
              </Box>
            </Box>
            <Box
              display={{ base: "flex", lg: "block" }}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Box>
          </Stack>

          <FooterList
            title="Retreats"
            listItems={[
              { label: "Book A Retreat", url: "book-a-retreat" },
              { label: "Facilities", url: "facilities" },
            ]}
          />
          <FooterList
            title="Holy Mass"
            listItems={[
              { label: "Mass offerings", url: "your-mass-offering" },
              { label: "Today's Mass", url: "todays-mass" },
            ]}
          />
          <FooterList
            title="Help & Support"
            listItems={[
              { label: "Contact Us", url: "/contact-us" },
              { label: "Prayer Request", url: "/prayer-request" },
              { label: "FAQs", url: "faq" },
            ]}
          />
          <FooterList
            title="Legal"
            listItems={[
              { label: "Terms & Condition", url: "/terms-and-condition" },
              { label: "Privacy & Policy", url: "/privacy" },
              { label: "Cancellation Policy", url: "/cancellation" },
              { label: "Refund", url: "/refund" },
            ]}
          />
        </SimpleGrid>
        <Box
          display={{ base: "block", lg: "flex" }}
          justifyContent="space-between"
          mt={20}
        >
          <Text fontSize={"sm"} fontWeight={500} textAlign="center" mb={5}>
            All rights reserved © 2023 Logos Retreat Centre
          </Text>
          <Text fontSize={"sm"} textAlign="center">
            Made with ❤ by
            <span
              style={{ fontWeight: 500, cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.wisdomworks.co/", "_blank")
              }
            >
              {` Wisdom Works `}
            </span>
            for a better Christian web
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

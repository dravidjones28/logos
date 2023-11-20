import LGBox from "../components/common/LGBox";
import { Card, Heading, Text } from "@chakra-ui/react";
import { Terms } from "./TermsAndCondition";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Privacy = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <LGBox>
      <Card
        bg="#4a8edd"
        color="#fff"
        p={{ base: "10px", lg: "30px" }}
        my={5}
        mx={{ base: "20px", lg: "80px" }}
      >
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
          Privacy & Policy{" "}
        </Heading>
        <Text fontWeight={500} fontSize={{ base: "14px", lg: "16px" }}>
          Last modified: 14 Sep 2023
        </Text>
        <Terms
          title="Introduction"
          subtitle={[
            ` This Privacy Policy governs VINCENTIAN ASHRAM TRUST, Bangalore (“VINCENTIAN
                ASHRAM TRUST, Bangalore” or “Us”) use, disclosure, collection and storage of
                personal information and data provided to it by the customers and users (“Users”
                or “You” or “Your”) of  logosretreatcenter.com`,
            `This Privacy Policy does not extend to information acquired by VINCENTIAN ASHRAM
                TRUST, Bangalore from third party sources. This Privacy Policy is in addition to
                all other Agreements between you and VINCENTIAN ASHRAM TRUST, Bangalore.`,
            `  By your continued use of the Services or providing VINCENTIAN ASHRAM TRUST,
                Bangalore with information through the Website, you acknowledge that you have
                read and understood this Privacy Policy and accept the practices described
                hereunder.`,
            `In addition to this Privacy Policy, VINCENTIAN ASHRAM TRUST, Bangalore may at
                any time present different or additional practices or terms for certain features
                of the Services or for promotional or special offers. These additional or
                different practices will be published on the Website and will apply to you from
                the date of such publication. If you have any further privacy or security
                queries, please contact us at logosblr@gmail.com`,
          ]}
        />
        <Terms
          title="Type of Information Collected"
          subtitle={[
            ` You agree that VINCENTIAN ASHRAM TRUST, collects, stores and uses the following
          information with your consent for the sole purpose of rendering and improving
          the Services`,
            ` Information you may give us: Information you may voluntarily give us at the time
          of using the services, may include but not be limited to name, age, gender,
          contact details, photo, government identity.`,
            ` Information we get from you when you use the Services: We collect the following
          information from your use of the Services and the manner in which you use them:`,
          ]}
          lists={[
            ` Device information, including but not limited to information of your IP
          address, device make, device model, device operating system, device
          operating system version, latitude/longitude location, carrier, data
          connection type, availability of payment enabled mobile wallets (examples:
          Apple Pay, Google Pay etc.), and sensor information such as barometric
          pressure, accelerometer measurements, gyroscope measurements, device
          orientation, magnetic field measurements, direction of travel, motion
          activity (e.g. walking), or other similar sensor measurements`,
            `                        Browser information including but not limited to the type of browser,
          language, your browser history`,
            `Log information`,
            `Information uploaded by you onto the Services, communications between you
          and other Users including but not limited to photographs, e-mails, messages,
          notes, text, drawings, images, audio messages, video files`,
            ` Behaviour information including but not limited to information regarding the
          domain, referring website address, date and time of visits, page view data,
          keywords, visitor activities, geo location (city, country, zip code),
          advertisements identifiers (IDFA or Google Advertising ID etc.), history of
          advertisements and behavioural information from such advertisements, click
          data`,
            `  Location information may be derived from your IP address, GPS or any other
          sensor that may have access points and cell towers`,
            `  Information from cookies and other usage data.`,
          ]}
        />
        <Terms
          subtitle={[
            `VINCENTIAN ASHRAM TRUST, Bangalore or any of its third-party services may from
            time to time require you to provide it with payment related information
            including credit card, debit card, bank account details, passwords, one-time
            passwords and billing addresses.`,
            `You may at your discretion allow VINCENTIAN ASHRAM TRUST, Bangalore to access
            your contacts and your contacts' information including but not limited to
            email ids, phone numbers, and addresses. `,
          ]}
        />
        <Terms
          title="Cookies"
          subtitle={[
            `VINCENTIAN ASHRAM TRUST, Bangalore may place and access certain cookies when you
            visit certain parts of the Website. Cookies are small text file placed on your
            device for the purpose of analysing the web page flow, measuring promotional
            effectiveness and promoting trust and safety`,
            ` Before VINCENTIAN ASHRAM TRUST, Bangalore places cookies on your device, you
            will be presented with a message bar requesting your consent to set those
            cookies. You may, at your discretion deny consent to the placing of cookies;
            however, this may result in certain features of VINCENTIAN ASHRAM TRUST,
            Bangalore not being fully functional or as intended. You may choose to enable or
            disable Cookies on your internet browser at any time. You may further choose to
            delete Cookies at any time; however, this may result in you losing information
            that enables you to access VINCENTIAN ASHRAM TRUST, Bangalore Services
            efficiently and effectively including, but not limited to, personalized
            settings.`,
            `Please note that VINCENTIAN ASHRAM TRUST, Bangalore does not control the use of
            cookies on third-party websites. VINCENTIAN ASHRAM TRUST, Bangalore shall at no
            given time require any User to disclose sensitive personal information through a
            telephonic call or e-mail. You are advised not to disclose or forward such
            information to anyone`,
          ]}
        />
        <Terms
          title="Use of Information"
          lists={[
            ` To develop and improve VINCENTIAN ASHRAM TRUST, Bangalore Services,
         websites, products, content and advertising`,
            `Contacting you and sending you technical notices, updates, security
         alerts, information regards change to the Terms of Use of this Privacy
         Policy and other administrative messages`,
            ` Providing you location-based services and offers based on your interest`,
            `Detecting fraud and abuse`,
            `Keeping internal records`,
            ` You may at your discretion allow VINCENTIAN ASHRAM TRUST, Bangalore to
            subscribe you and/or your contacts to CRM Bangalore promotional emails,
            messages, ongoing offers and other social features including sending
            invites and referral links to your contacts.`,
            ` VINCENTIAN ASHRAM TRUST, Bangalore may provide certain additional features
            through third-party service providers. Such third-party service providers
            may have access to some of your information for the purpose of providing
            services or completing transactions, however they shall be bound by this
            Privacy Policy`,
            `  In the event that VINCENTIAN ASHRAM TRUST, Bangalore is transferred, or
            some of its assets are sold, it may disclose any or all of your
            information to the acquiring party`,
            ` VINCENTIAN ASHRAM TRUST, Bangalore may also access, use, store and
            disclose Personal Information (including the content of your
            communications) to comply with the law and lawful requests or legal
            process, enforce the terms and policies governing your use of the Service,
            including investigations of any potential violation, to detect or prevent
            security breaches, fraud or technical issues, to protect the rights or
            property of VINCENTIAN ASHRAM TRUST, Bangalore Solutions and its Users,
            and when VINCENTIAN ASHRAM TRUST, Bangalore believes in good faith that
            the disclosure is necessary to protect the personal safety of VINCENTIAN
            ASHRAM TRUST, Bangalore, its employees, Users or the general public`,
          ]}
        />
        <Terms
          subtitle={[
            ` Other than the aforesaid, VINCENTIAN ASHRAM TRUST, Bangalore shall not use or
                    disclose your Information for purposes other than those for which it was
                    collected.`,
          ]}
        />
        <Terms
          title=" Third Party Services"
          subtitle={[
            ` VINCENTIAN ASHRAM TRUST, Bangalore may engage third party service providers for
            the purpose of rendering the Services. Such third-party service providers may
            have access to any or all of your information`,
            `All information used by such third-party service providers shall be restricted
            to the extent required for the performance of their services. All data processed
            by third parties shall be in accordance with this Privacy Policy, General Data
            Protection Regulations and other domestic data protection laws.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore may at its sole discretion transmit certain
            data to third parties for marketing and advertising purposes.`,
          ]}
        />
        <Terms
          title="Parental Rights and Child Protection"
          subtitle={[
            `Individuals below the age of 18 years shall disclose all information strictly
            under the supervision of a parent of legal guardian. Parents or legal guardians
            may review their child’s information on the Website at any given time, direct
            VINCENTIAN ASHRAM TRUST, Bangalore to delete it or refuse further consent for
            collection of the child’s information.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore does not knowingly collect any information of
            individuals under the age of 13 years. If you are under the age of 13 please do
            not use the Services. In the event that it comes to the notice of VINCENTIAN
            ASHRAM TRUST, Bangalore that any individual is in breach of this requirement,
            VINCENTIAN ASHRAM TRUST, Bangalore shall terminate their account and bar their
            activities on the Website.`,
          ]}
        />
        <Terms
          title="Security"
          subtitle={[
            `VINCENTIAN ASHRAM TRUST, Bangalore has put in place suitable physical,
            electronic and managerial procedures to safeguard and secure your information.`,
            `You are personally responsible for maintaining the confidentiality of your login
            passwords, one-time passwords or other passwords.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore uses encrypted and approved payment gateways
            for all financial transactions.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore agrees that it shall not use your information
            for any purpose other than for rendering the Services.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore uses commercially reasonable methods to
            protect your information, however, transmission of information over the internet
            is not always perfectly secure and VINCENTIAN ASHRAM TRUST, Bangalore cannot
            ensure the security of your information transmitted on the Website or Services.
            You agree that you provide VINCENTIAN ASHRAM TRUST, Bangalore with information
            at your own risk.`,
          ]}
        />
        <Terms
          title="Modifications"
          subtitle={[
            ` VINCENTIAN ASHRAM TRUST, Bangalore reserves the right to modify this Privacy
            Policy at any time and in any manner whatsoever, at its sole discretion. All
            modifications to this Privacy Policy shall be posted on the Website; they shall
            be effective from the date of posting such notice. You agree that VINCENTIAN
            ASHRAM TRUST, Bangalore shall not be liable to you or to any third party for any
            modification to this Privacy Policy. You further acknowledge that you have the
            right to cease using any or all of the Services at any given time at your
            discretion.`,
          ]}
        />
        <Terms
          title="Communication"
          subtitle={[
            `If VINCENTIAN ASHRAM TRUST, Bangalore is made aware of any security systems
            breach, it shall attempt to notify you electronically.`,
            ` You may direct all communications to support@logosretreatcentre.com including requests to
            cease using any or all of your information.`,
          ]}
        />
      </Card>
    </LGBox>
  );
};

export default Privacy;

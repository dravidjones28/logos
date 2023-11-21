import {
  Box,
  Card,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import LGBox from "../components/common/LGBox";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";

interface Props {
  title?: string;
  subtitle?: string[];
  lists?: string[];
  link?: boolean;
}

export const Terms = ({ title, subtitle, lists, link }: Props) => {
  return (
    <Box mt={6} mb={3}>
      {title && (
        <Heading fontSize={{ base: "xl", lg: "2xl" }} mb={1}>
          {title}
        </Heading>
      )}
      {link && (
        <>
          <span style={{ fontWeight: 500 }}>At </span>
          <Link
            to="https://www.logosretreatcenter.com"
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 500 }}
          >
            <span style={{ color: "#fff", fontWeight: 400 }}>
              logosretreatcenter.com
            </span>
            <Text fontWeight={500}>
              “VINCENTIAN ASHRAM TRUST”, we do not offer refunds for any
              offerings, contributions, or donations. All offerings,
              contributions, and donations are considered non-refundable and
              non-transferable. We also do not offer refunds for mass
              intentions, or any other contributions to VINCENTIAN ASHRAM TRUST.
            </Text>
            <br />
            <Text fontWeight={500}>
              We understand that circumstances may arise that require the
              cancellation of a mass intention or other contribution. However,
              we are not able to provide refunds.
            </Text>
            <br />
            <Text fontWeight={500}>
              Thank you for your understanding and your support of VINCENTIAN
              ASHRAM TRUST. If you have any questions, please don't hesitate to
              contact us.
            </Text>
          </Link>
        </>
      )}
      {subtitle &&
        subtitle.map((item) => (
          <>
            <Text
              mt={3}
              fontSize={{ base: "14px", lg: "16px" }}
              mb={5}
              fontWeight={500}
            >
              {item}
            </Text>
          </>
        ))}
      {lists && (
        <UnorderedList>
          {lists.map((item) => (
            <>
              <ListItem mt={3} fontSize={{ base: "14px", lg: "16px" }}>
                {item}
              </ListItem>
            </>
          ))}
        </UnorderedList>
      )}
    </Box>
  );
};

export const ContactCard = () => {
  return (
    <Card maxWidth="500px" p={5}>
      <Text fontSize={{ base: "14px", lg: "16px" }} fontWeight={400}>
        Contact Us:
        <strong style={{ fontWeight: 500, fontSize: "15px" }}>
          +91 6366 609 505
        </strong>
      </Text>
      <Text fontSize={{ base: "14px", lg: "16px" }} fontWeight={400}>
        mailto:{" "}
        <strong style={{ fontWeight: 500, fontSize: "15px" }}>
          <a href="mailto:support@logosretreatcentre.com">
            support@logosretreatcentre.com
          </a>
        </strong>
      </Text>
      <Text fontSize={{ base: "14px", lg: "16px" }} fontWeight={400}>
        Our address is :
        <strong style={{ fontWeight: 500, fontSize: "15px" }}>
          <br />1 No 29, Prakruthi Township, Ist Main, Babusahibpalaya, Hormavu
          P.O, Bengaluru - 560 113.
        </strong>
      </Text>
    </Card>
  );
};

const TermsAndCondition = () => {
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
          Terms & Conditions
        </Heading>
        <Text fontWeight={500} fontSize={{ base: "14px", lg: "16px" }}>
          Last modified: 14 Sep 2023
        </Text>
        <Terms
          title="Introduction"
          subtitle={[
            `These Terms of Use constitute a legal agreement between you and VINCENTIAN
                    ASHRAM TRUST, Bangalore (“We” or “Us”). It governs your use of
                    logosretreatcentre.com (“Website”). Your access and use of the Services are
                    subject to these Terms of Use, the Privacy Policy and the End User License
                    Agreement (if any) applicable to your device. These Terms of Use are in addition
                    to any other agreements between you and VINCENTIAN ASHRAM TRUST, Bangalore. By
                    using the Services, you acknowledge that you have read and understood these
                    Terms of Use and you agree to be bound by them at all times. If you do not agree
                    to these Terms of Use, kindly do not use the Services.`,
            `  For the purpose of these Terms of Use, wherever the context so requires ‘You’ or
                    ‘Your’ or ‘User’ shall mean any natural or legal person who uses or registers on
                    the Website or avails of any of the Services.`,
          ]}
        />

        <Terms
          title="Modifications"
          subtitle={[
            ` VINCENTIAN ASHRAM TRUST, Bangalore reserves the right to modify any of these
           Terms of Use at any time and in any manner whatsoever, at its sole discretion,
           including but not limited to the right to charge for the Services (or any part
           thereof). All modifications to these Terms of Use shall be posted on the Website
           and shall be effective from the date of posting such notice. You agree that
           VINCENTIAN ASHRAM TRUST, Bangalore shall not be liable to you or to any third
           party for any modification to these Terms of Use. You have the right to cease
           using any or all of the Services at any given time at your discretion.`,
          ]}
        />
        <Terms
          title="Registration"
          subtitle={[
            `By using the Services, you agree that you are competent to contract and are at
            least 18 years of age. However, if you are below the age of 18 years, you may
            avail the Services under the supervision of a parent or a legal guardian.`,
            `  You agree that you shall provide true, accurate, current and complete
            information about yourself at the time of registration for any of the Services
            or at any time so required thereafter (“Registration Data”).`,
          ]}
        />
        <Terms
          title="Usage Guidelines and Restrictions"
          subtitle={[
            `You agree that the Services are for your personal use and you shall not host
                    display, upload, modify, publish, transmit, update or share any information
                    which:`,
          ]}
          lists={[
            ` belongs to another person and to which You have no right or contains any
          video, photographs, or images of any third-party person or group of persons
          without their consent (including minors represented by their parents /
          guardians)`,
            `is misleading, abusive, harmful, harassing, blasphemous, defamatory,
          obscene, pornographic, paedophilic, libellous, obscene, invasive of
          another’s privacy, defamatory, hateful, racially, ethnically objectionable,
          sexually explicit, bigotry, disparaging, relating or encouraging money
          laundering or gambling, or unlawfully threatening, unlawfully harassing or
          otherwise unlawful in any manner whatsoever`,
            `involves the transmission of ‘junk mail’, ‘chain letters’, or unsolicited
          mass mailing or ‘spamming’`,
            `infringes any patent, trademark, copyright or other proprietary rights or
          third party’s trade secrets, invasion of rights of privacy including but not
          limited to unauthorized disclosure of a person’s name, email address,
          physical address or phone number;`,
            `promotes an illegal or unauthorized copy of another person’s copyrighted
          work such as providing pirated computer programs or links to them, providing
          information to circumvent manufacture-installed copy-protect devices, or
          providing pirated music or links to pirated music files;`,
            `contains restricted or password-only access pages, or hidden pages or images
          (those not linked to or from another accessible page`,
            `tries to gain unauthorized access or exceeds the scope of authorized access
          to the Website or to profiles, blogs, communities, account information,
          bulletins, friend request, or other areas of the Website or solicits
          passwords or personal identifying information for commercial or unlawful
          purposes from other Users`,
            `engages in commercial activities and/or sales without prior written consent
          of Bread of Life such as contests, sweepstakes, barter, advertising and
          pyramid schemes, or the buying or selling of ‘virtual’ items related to the
          Website`,
            `interferes with another User’s use and enjoyment of the Services
          `,
            `harms minors in any way
          `,
            `deceives or misleads the addressee/ Users about the origin of such messages
          or communicates any information which is grossly offensive or menacing in
          nature`,
            `impersonates another person or group of persons
          `,
            `contains software viruses or any other computer code, files or programs
          designed to interrupt, destroy or limit the functionality of any computer
          resource; or contains any trojan horses, worms, time bombs, cancelbots,
          easter eggs or other computer programming routines that may damage,
          detrimentally interfere with, diminish value of, surreptitiously intercept
          or expropriate any system, data or personal information; providing or
          creating computer viruses`,
            `threatens the unity, integrity, defence, security or sovereignty of India,
          friendly relations with foreign states, or public order or causes incitement
          to the commission of any cognizable offence or prevents investigation of any
          offence or is insulting to any other nation.`,
            `is false, inaccurate or misleading and which may create any such liability
          for Assurance or cause VINCENTIAN ASHRAM TRUST, Bangalore to lose (in whole
          or in part) the services of its internet service providers (IPS) or other
          suppliers`,
          ]}
        />
        <Terms
          subtitle={[
            `You further agree that You shall not use any “page-scraper”, “robot”, “spider”
            or other automatic device, program, algorithm, hacking tool or methodology, or
            any similar or equivalent manual process or technology for the purpose of
            hacking, accessing, acquiring, copying, mining or monitoring any portion of the
            Website or any Content, or reproduce or circumvent the navigational structure or
            presentation of the Website or any Content, to obtain or attempt to obtain any
            materials, documents or information through any means not purposely made
            available through the Website. VINCENTIAN ASHRAM TRUST, Bangalore reserve the
            right to bar any such activity.`,
            `  You shall not probe, scan or test the vulnerability of the Services or any
            network connected to the Website nor breach the security or authentication
            measures on the Website, or any network connected to the Website. You shall not
            reverse look-up, trace or seek to trace any information of any other User,
            including but not limited to any account on the website not owned by You, to its
            source, or exploit any or all of the Services or information made available or
            offered by or through the Website, in any way where the purpose is to reveal any
            information, including but not limited to personal identification.`,
            ` You shall not make any negative, denigrating or defamatory statement(s) or
            comment(s) about VINCENTIAN ASHRAM TRUST, Bangalore or its brand name or domain
            name, or otherwise engage in any conduct or action that might tarnish the image
            or reputation, of VINCENTIAN ASHRAM TRUST, Bangalore or its members or otherwise
            tarnish or dilute any of VINCENTIAN ASHRAM TRUST, Bangalore’s trade or service
            marks, trade name and/or goodwill.`,
            `You agree that you shall not take any action that imposes an unreasonable or
            disproportionately large load on the infrastructure of the Services or any
            systems or networks connected to VINCENTIAN ASHRAM TRUST, Bangalore.`,
            `You shall not use any device, software or routine to interfere or attempt to
            interfere with the proper working of the Website or any transaction being
            conducted on the Website, or with any other person’s use of the Website. You
            shall not forge headers or otherwise manipulate identifiers in order to disguise
            the origin of any message or transmittal you send VINCENTIAN ASHRAM TRUST,
            Bangalore, on or through any of the Services offered on or through the Website.`,
            `You shall not use the Services or any content therein for any purpose that is
            unlawful or prohibited by these Terms of Use, or to solicit the performance of
            any illegal activity or other activity which infringes the rights of VINCENTIAN
            ASHRAM TRUST, Bangalore or any other person.`,
            `  You shall not engage in any transaction, which is prohibited by the provisions
            of any applicable law of India or Your respective domestic laws, including
            prevailing exchange control laws or regulations and / or international law.`,
          ]}
        />
        <Terms
          title="Content"
          subtitle={[
            `The Services may allow You and other third parties to post data, messages,
            comments, photographs, drawings, opinions, videos, audio files, e-mails, notes
            and other materials and information that may be accessible by You or other Users
            (“Private Content”); (the Private Content along with any Registration Data shall
            collectively be referred to as “User Content”). You agree that you shall be
            personally responsible for all User Content transmitted through any or all of
            the Services. You shall ensure that all User Content posted by You shall be in
            accordance with VINCENTIAN ASHRAM TRUST, Bangalore’s Privacy Policy and these
            Terms of Use.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore may at its sole discretion review and delete
            any User Content, in whole or in part that VINCENTIAN ASHRAM TRUST, Bangalore
            may perceive to be offensive, illegal or violating any third-party rights and /
            or otherwise breaches these Terms of Use.`,
            ` You hereby grant VINCENTIAN ASHRAM TRUST, Bangalore complete access to Your User
            Content including but not limited to a royalty free, worldwide, transferable
            license to use Your User Content for the purposes of rendering the Services or
            rendering you access to the Services (or to any part thereto).`,
          ]}
        />
        <Terms
          title="Termination"
          subtitle={[
            `These Terms of Use shall remain in full force and effect unless terminated in
            accordance with this section. You may choose to terminate your account for any
            reason, at any given time.`,
            `You agree that VINCENTIAN ASHRAM TRUST, Bangalore may at any given time, at its
            sole discretion terminate Your, use of the Services and/or access to the Website
            (or any part thereof) due to lack of use of the Services, improper use of the
            Services, violation of any law in force or these Terms of Use or failure to pay
            any fees, where applicable.`,
            ` You agree that under no circumstances shall VINCENTIAN ASHRAM TRUST, Bangalore
            be liable to you or any third party for any modification or termination of your
            access to the Services, or for your inability to recover any User Content.`,
          ]}
        />
        <Terms
          title="Limited liability"
          subtitle={[
            `VINCENTIAN ASHRAM TRUST, Bangalore, its affiliates, suppliers, and their
            respective members, trustees, employees, and agents shall not be held liable for
            any indirect, speculative, consequential, exemplary, incidental, special or
            punitive damages, which may include but not be limited to loss or theft of data,
            failure in the Services, business interruptions, and loss of profits, revenues
            or data or any other financial loss, regardless of whether such persons had
            advance notice of the possibility of any such damages. To the extent permitted
            by law, VINCENTIAN ASHRAM TRUST, Bangalore, its suppliers, members, trustees,
            employees, and agent’s liability shall not exceed the amount paid by the User
            for the purpose of availing the Services.`,
            `You agree that VINCENTIAN ASHRAM TRUST, Bangalore may at any given time, at its
            sole discretion terminate Your, use of the Services and/or access to the Website
            (or any part thereof) due to lack of use of the Services, improper use of the
            Services, violation of any law in force or these Terms of Use or failure to pay
            any fees, where applicable.`,
            ` Each of these provisions are severable and independent of all other provisions
            of these Terms of Use. Notwithstanding the above, VINCENTIAN ASHRAM TRUST,
            Bangalore shall not be liable for any unforeseeable and/or unreasonable damages.`,
            ` VINCENTIAN ASHRAM TRUST, Bangalore shall not be liable for any third-party
            content, actions, services; or links to third-party websites on the Website,
            which are not under the control of VINCENTIAN ASHRAM TRUST, Bangalore. You are
            advised to exercise discretion while relying on the same.`,
          ]}
        />
        <Terms
          title="Indemnity"
          subtitle={[
            `You agree to defend, indemnify and hold harmless VINCENTIAN ASHRAM TRUST,
            Bangalore, its members, trustees, employees, and agents from and against any and
            all cost, damages, liabilities and expenses (including reasonable attorney fees,
            costs, penalties interest and disbursements) they may incur in relation to,
            arising from, or for the purpose of avoiding, any claim or demand from a third
            party relating to Your use of the Services or the use of the Services by any
            person using Your account, including any claim that Your use of the Services
            violates any applicable law or regulation, rights of any third party or these
            Terms of Use.`,
          ]}
        />
        <Terms
          title="Representations and Warranties"
          subtitle={[
            `The Services and content thereto made available to you through the Website or
            otherwise are provided to you on an ‘as is’ basis, without representations or
            warranties of any kind. VINCENTIAN ASHRAM TRUST, Bangalore disclaims all
            representations and warranties whether expressed or implied, oral or written
            with respect to the Services or content thereto, whether alleged to arise by
            operation of law, by reason of custom, usage or otherwise.`,
            `VINCENTIAN ASHRAM TRUST, Bangalore further makes no representation or warranty
            with respect to the quality, value, scalability, functionality, accuracy,
            authenticity, title and non-infringement of the content or Services offered on
            the Website or otherwise.`,
          ]}
        />
        <Terms
          title="Intellectual Property"
          subtitle={[
            ` You shall own all right, title and interest including all intellectual property
            rights to Your User Content. VINCENTIAN ASHRAM TRUST, Bangalore shall not be
            responsible for any infringement of any third-party intellectual property rights
            in the User Content posted by you on the Website, in your private messages or
            otherwise.`,
            ` Your access to the Services is governed and limited by your acceptance of these
            Terms of Use and VINCENTIAN ASHRAM TRUST, Bangalore shall retain all rights,
            title and interest in and to the Services and all intellectual property thereto
            including but not limited to various tangible and intangible information
            including, various data, trademarks, trade names, trade secrets, registered or
            unregistered trademarks, logos, patents, copyrights, designs, or any other
            documents.`,
          ]}
        />
        <Terms
          title="Governing Law and Arbitration"
          subtitle={[
            ` These Terms of Use shall be governed and construed in accordance with the laws
            of India. All disputes, claims, suits and actions arising out of this Agreement
            or its validity shall be finally decided by arbitration in accordance with the
            provisions of the Arbitration and Conciliation Act, 1996. The arbitral tribunal
            shall comprise of a sole arbitrator mutually appointed by the parties to the
            dispute. The venue for arbitration shall be at Bengaluru City, India. The
            arbitration proceedings shall be conducted in English. Any award made in such
            arbitration shall be final and binding on the parties to the dispute.`,
            ` Subject to the above, the competent courts at Bengaluru City, India alone shall
            have the jurisdiction over issues arising out of this Agreement.`,
          ]}
        />
        <Terms
          title="Severability"
          subtitle={[
            `Any provision of this Agreement that is prohibited or unenforceable in any
            jurisdiction shall, as to such jurisdiction, be ineffective to the extent of
            such prohibition or unenforceability without invalidating the remaining portions
            hereof or affecting the validity or enforceability of such provision in any
            other jurisdiction.`,
          ]}
        />
        <ContactCard />
      </Card>
      <Box mt={20}>
        <Footer />
      </Box>
    </LGBox>
  );
};

export default TermsAndCondition;

// import { BiSolidDashboard, BiSolidChurch } from "react-icons/bi";
// import { BsPersonBadge } from "react-icons/bs";
// import { MdPermMedia } from "react-icons/md";
// import { MdAccountCircle } from "react-icons/md";

import NavItem from "./utlies/navItem";

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Retreat",
    children: [
      {
        label: "Book a retreat",
        href: "bookRetreat",
      },
      {
        label: "Your bookings",
        href: "yourBookings",
      },
      {
        label: "Facilities",
        subLabel: "sublabel for facilities",
        href: "facilities",
      },
    ],
  },
  {
    label: "Holy Mass",
    children: [
      {
        label: "Mass offerings",
        subLabel: "Book your mass offering",
        href: "massOffering",
      },
      {
        label: "Your Mass offerings",
        subLabel: "Check your mass offerings",
        href: "yourMassOffering",
      },
      {
        label: "Today's Mass",
        href: "todaysMass",
      },
      {
        label: "Types of Mass Offerings",
        href: "typesOfMassOfferings",
      },
    ],
  },

  {
    label: "About",
    children: [
      {
        label: "Logos Retreat Center",
        href: "aboutUs",
      },
      {
        label: "Vincentian Congregation",
        href: "vincentianCongregation",
      },
      {
        label: "Our Priests",
        href: "priests",
      },
      {
        label: "Fr Jose",
        href: "frJose",
      },
    ],
    href: "#",
  },
  {
    label: "Support",
    children: [
      {
        label: "Contact Us",
        href: "/contactUs",
      },
      {
        label: "Prayer Request",
        href: "/prayerRequest",
      },
      {
        label: "FAQ",
        href: "faq",
      },
    ],
    href: "#",
  },
  {
    label: "Media",
    children: [
      {
        label: "Blogs",
        subLabel: "Read our blog posts",
        href: "/blogs",
      },
      {
        label: "Testimonies",
        subLabel: "What people experience",

        href: "/testimonials",
      },
    ],
    href: "#",
  },
];

export default NAV_ITEMS;

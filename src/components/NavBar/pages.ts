import NavItem from "./utlies/navItem";

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Retreats",
    children: [
      {
        label: "Book a retreat",
        href: "book-a-retreat",
      },
      {
        label: "Your bookings",
        href: "your-bookings",
      },
      {
        label: "Facilities at Logos",
        subLabel: "sublabel for facilities",
        href: "facilities",
      },
    ],
  },
  {
    label: "Holy Mass",
    children: [
      {
        label: "Mass Offering",
        subLabel: "Offer a mass online",
        href: "mass-offering",
      },
      {
        label: "Your Mass offerings",
        subLabel: "Check your mass offerings",
        href: "your-mass-offering",
      },
      {
        label: "Today's Mass",
        href: "todays-mass",
      },
      {
        label: "Types of Mass Offerings",
        href: "types-of-mass-offerings",
      },
    ],
  },

  {
    label: "About",
    children: [
      {
        label: "Logos Retreat Centre",
        href: "about-us",
      },
      {
        label: "Vincentian Congregation",
        href: "vincentian-congregation",
      },
      {
        label: "Our Priests",
        href: "priests",
      },
      {
        label: "Fr Jose",
        href: "fr-jose",
      },
    ],
    href: "#",
  },
  {
    label: "Support",
    children: [
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        label: "Prayer Request",
        href: "/prayer-request",
      },
      {
        label: "FAQs",
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
        subLabel: "People's experiences at our centre",

        href: "/testimonials",
      },
    ],
    href: "#",
  },
];

export default NAV_ITEMS;

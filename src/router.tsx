import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Testimonial from "./pages/Testimonial";
import SingleBlog from "./pages/SingleBlog";
import SingleTestimonial from "./pages/SingleTestimonial";
import ErrorPage from "./pages/ErrorPage";
import CreateTestimonal from "./pages/CreateTestimonial";
import PrayerRequest from "./pages/PrayerRequest";
import ContactUs from "./pages/ContactUs";
import BookRetreat from "./pages/BookRetreat";
import Bookings from "./pages/Bookings";
import YourBookings from "./pages/YourBookings";
import MassBooking from "./pages/MassBooking";
import YourMassOffering from "./pages/YourMassBooking";
import Facilities from "./pages/Facilities";
import PrivateRoute from "./pages/PrivateRoute";
import TypesOfMass from "./pages/TypesOfMass";
import TodaysMass from "./pages/TodaysMass";
import AboutUs from "./pages/AboutUs";
import VincentianCongregation from "./pages/VincentianCongregation";
import Priests from "./pages/Priests";
import FrJose from "./pages/FrJose";
import Faq from "./pages/Faq";
import TermsAndCondition from "./pages/TermsAndCondition";
import Cancellation from "./pages/Cancellation";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
// import Layout from "./components/Dashboard/Layout";
// import Dashboard from "./pages/Dashboard";
// import DashboardBookingRetreat from "./pages/DashboardBookingRetreat";
// import DashboardMassBooking from "./pages/DashboardMassBooking";
// import DashboardPrayerRequest from "./pages/DashboardPrayerRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,

    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },

      {
        path: "blogs/:slug",
        element: <SingleBlog />,
      },

      {
        path: "blogs/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "testimonials",
        element: <Testimonial />,
      },
      {
        path: "testimonials/createTestimonial",
        element: <CreateTestimonal />,
      },
      {
        path: "testimonials/:slug",
        element: <SingleTestimonial />,
      },
      {
        path: "prayer-request",
        element: <PrayerRequest />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "book-a-retreat",
        element: <BookRetreat />,
      },

      {
        path: "facilities",
        element: <Facilities />,
      },
      {
        path: "mass-offering",
        element: <MassBooking />,
      },
      {
        path: "types-of-mass-offerings",
        element: <TypesOfMass />,
      },
      {
        path: "todays-mass",
        element: <TodaysMass />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "vincentian-congregation",
        element: <VincentianCongregation />,
      },
      {
        path: "priests",
        element: <Priests />,
      },
      {
        path: "fr-jose",
        element: <FrJose />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "terms-and-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "cancellation",
        element: <Cancellation />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "refund",
        element: <Refund />,
      },
    ],
  },
  {
    element: <NavBar />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "your-bookings",
            element: <YourBookings />,
          },
          {
            path: "your-mass-offering",
            element: <YourMassOffering />,
          },
          {
            path: "bookRetreat/booking/:slug",
            element: <Bookings />,
          },
        ],
      },
    ],
  },

  // {
  // path: "dashboard",
  // element: <Layout />,
  // errorElement: <ErrorPage />,
  // children: [
  // { index: true, element: <Dashboard /> },
  // { path: "retreat-bookings", element: <DashboardBookingRetreat /> },
  // { path: "mass-bookings", element: <DashboardMassBooking /> },
  // {
  // path: "prayer-request",
  // element: <DashboardPrayerRequest />,
  // },
  // ],
  // },
]);

export default router;

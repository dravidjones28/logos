import Hero from "../components/Hero/Hero";
import BookingSection from "../components/bookingRetreat/BookingSection";
import YoutubeSection from "../components/youtubeSection/YoutubeSection";
import Testimonials from "../components/testimonials/Testimonials";
import TestimonialsExperience from "../components/testimonials/TestimonialsExperience";
import PrayerRequest from "../components/prayerRequest/PrayerRequest";
import BlogPage from "../components/blog/BlogPage";
import Subcribe from "../components/subscribe/Subcribe";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Hero />
      <BookingSection />
      <YoutubeSection />
      <TestimonialsExperience
        title=" Experiences at Logos Retreat Centre"
        des=" Discover how lives have been transformed through faith and connection
          with Jesus at Logos Retreat Centre."
      />
      <Testimonials />
      <PrayerRequest />
      <TestimonialsExperience
        title="More Insights from Our Priests"
        des="From teachings and reflections to discussions about everyday life, explore additional articles penned by our priests."
      />
      <BlogPage />
      <Subcribe />
      <Footer />
    </>
  );
}

export default LandingPage;

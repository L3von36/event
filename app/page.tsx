import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VisionMission from "@/components/VisionMission";
import FeaturedEvents from "@/components/FeaturedEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [services, events, faqs, testimonials] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.event.findMany({ where: { featured: true }, orderBy: { createdAt: 'desc' } }),
    prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <Hero />
      <Services initialServices={services} />
      <VisionMission />
      <FeaturedEvents initialEvents={events} />
      <WhyChooseUs />
      <Testimonials initialTestimonials={testimonials} />
      <FAQ initialFaqs={faqs} />
      <ContactForm />
      <Footer />
    </main>
  );
}

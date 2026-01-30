
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedEvents from "@/components/FeaturedEvents";
import { prisma } from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";

export default async function EventsPage() {
  // Fetch ALL events (featured and non-featured, or just featured depending on requirement)
  // Typically an events page shows EVERYTHING.
  // The 'FeaturedEvents' component is named 'featured' but visually it's just a grid of event cards.
  // We can reuse it to show all events.
  const events = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <div className="pt-20">
        <FeaturedEvents initialEvents={events} />
      </div>
      <ContactForm />
      <Footer />
    </main>
  );
}

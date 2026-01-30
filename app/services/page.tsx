
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { prisma } from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <div className="pt-20">
        <Services initialServices={services} />
      </div>
      <ContactForm />
      <Footer />
    </main>
  );
}

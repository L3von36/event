import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding started...');

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@akirma.com' },
        update: {
            password: adminPassword,
            role: 'ADMIN',
        },
        create: {
            email: 'admin@akirma.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log('Admin user created.');

    // 2. Clear existing entries
    await prisma.service.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.testimonial.deleteMany({});
    await prisma.fAQ.deleteMany({});

    // 3. Seed Services
    const services = [
        { name: 'Wedding Planning', nameAm: 'የሰርግ ዝግጅት', desc: 'Traditional and modern Ethiopian weddings tailored to your dreams.', descAm: 'እንደ ህልምዎ የተዘጋጁ ባህላዊ እና ዘመናዊ የኢትዮጵያ ሰርጎች።', iconName: 'Heart', order: 1 },
        { name: 'Corporate Events', nameAm: 'የኮርፖሬት ዝግጅቶች', desc: 'Professional conferences, product launches, and business meetings.', descAm: 'ሙያዊ ኮንፈረንሶች፣ የምርት ማስጀመሪያዎች እና የንግድ ስብሰባዎች።', iconName: 'Briefcase', order: 2 },
        { name: 'Cultural & Religious Events', nameAm: 'ባህላዊ እና ሃይማኖታዊ', desc: 'Timket, Meskel, holidays, and large-scale church gatherings.', descAm: 'ጥምቀት፣ መስቀል፣ በዓላት እና ትላልቅ የቤተክርስቲያን ጉባኤዎች።', iconName: 'Star', order: 3 },
        { name: 'Concerts & Festivals', nameAm: 'ኮንሰርቶች እና ፌስቲቫሎች', desc: 'Full-scale stage, sound, and crowd management for major events.', descAm: 'ለታላላቅ ዝግጅቶች ሙሉ የመድረክ፣ የድምጽ እና የህዝብ አስተዳደር።', iconName: 'Music', order: 4 },
        { name: 'Decoration & Setup', nameAm: 'ዲኮር እና ቅንብር', desc: 'Breathtaking venue design, lighting, and cultural aesthetics.', descAm: 'አስደናቂ የቦታ ንድፍ፣ መብራት እና ባህላዊ ውበት።', iconName: 'Palette', order: 5 },
    ];

    for (const s of services) {
        await prisma.service.create({ data: s });
    }
    console.log('Services seeded.');

    // 4. Seed Events
    const events = [
        { title: 'Royal Ethiopian Wedding', titleAm: 'የንጉሳዊ ሰርግ', category: 'Wedding', categoryAm: 'ሰርግ', location: 'Addis Ababa', locationAm: 'አዲስ አበባ', year: '2025', image: '/images/event-wedding.png', featured: true },
        { title: 'Tech Innovation Summit', titleAm: 'የቴክኖሎጂ ፈጠራ ጉባኤ', category: 'Corporate', categoryAm: 'ኮርፖሬት', location: 'Skylight Hotel', locationAm: 'ስካይላይት ሆቴል', year: '2024', image: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80', featured: true },
        { title: 'Meskel Celebration', titleAm: 'የመስቀል በዓል አከባበር', category: 'Cultural', categoryAm: 'ባህላዊ', location: 'Meskel Square', locationAm: 'መስቀል አደባባይ', year: '2024', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80', featured: true },
        { title: 'Summer Music Festival', titleAm: 'የበጋ ሙዚቃ ፌስቲቫል', category: 'Concert', categoryAm: 'ኮንሰርት', location: 'Ghion Hotel', locationAm: 'ጊዮን ሆቴል', year: '2023', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', featured: true },
    ];

    for (const e of events) {
        await prisma.event.create({ data: e });
    }
    console.log('Events seeded.');

    // 5. Seed Testimonials
    const testimonials = [
        {
            quote: "Their logistical precision and focus on security made our city-wide events seamless. A truly professional team.",
            quoteAm: "ለከተማችን ሰላም እና ፀጥታ አስተዳደር የምናዘጋጃቸውን ዝግጅቶች በከፍተኛ ጥንቃቄ እና በሙያዊ ብቃት አከናውነዋል።",
            author: "Hon. Midekssa Kebede",
            authorAm: "የተከበሩ አቶ ሚዴቅሳ ከበደ",
            role: "Deputy Head, AA Peace & Security Bureau",
            roleAm: "የአዲስ አበባ ከተማ ሰላም እና ፀጥታ ቢሮ ምክትል ሀላፊ",
            order: 1
        },
        {
            quote: "The most reliable partner for sub-city development events. They deliver excellence every single time.",
            quoteAm: "ለክፍለ ከተማችን የልማት ዝግጅቶች እጅግ አስተማማኝ አጋር ናቸው። ሁልጊዜም ጥራቱን የጠበቀ አገልግሎት ይሰጣሉ።",
            author: "Hon. Tsige Jima",
            authorAm: "የተከበሩ ወ/ሮ ፅጌ ጂማ",
            role: "Deputy Manager, Lemi Kura Sub-city",
            roleAm: "የለሚ ኩራ ክ/ከተማ ምክትል ስራ አስኪያጅ",
            order: 2
        },
        {
            quote: "Innovation and culture perfectly blended. They handled our university summit with world-class standards.",
            quoteAm: "ቴክኖሎጂን ከባህል ጋር ፍጹም አዋህደዋል። የዩኒቨርስቲያችንን ስብሰባ በዓለም አቀፍ ደረጃ አከናውነዋል።",
            author: "Dr. Dereje",
            authorAm: "ዶክተር ደረጄ",
            role: "Director, AA Science & Technology University",
            roleAm: "የአዲስ አበባ ሳይንስ እና ቴክኖሎጂ ዩኒቨርስቲ ዳይሬክተር",
            order: 3
        },
    ];

    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t });
    }
    console.log('Testimonials seeded.');

    // 6. Seed FAQ
    const faqs = [
        { q: 'How far in advance should I book?', qAm: 'ከዝግጅቱ ስንት ጊዜ በፊት መያዝ አለብኝ?', a: 'For major weddings and large conferences, we recommend booking at least 6-12 months in advance. Smaller corporate events can be often arranged within 2-3 months.', aAm: 'ለትላልቅ ሰርጎች እና ስብሰባዎች ከ6-12 ወራት በፊት ቢይዙ ይመከራል። ለትንንሽ ዝግጅቶች ከ2-3 ወራት በፊት በቂ ነው።', order: 1 },
        { q: 'Do you handle events outside of Addis Ababa?', qAm: 'ከአዲስ አበባ ውጭ ዝግጅቶችን ታዘጋጃላችሁ?', a: 'Yes! We coordinate destination weddings and corporate retreats across Ethiopia, including Lalibela, Bahir Dar, and Hawassa.', aAm: 'አዎ! በኢትዮጵያ ውስጥ በማንኛውም ቦታ (ላሊበላ፣ ባህር ዳር፣ ሀዋሳ...) ዝግጅቶችን እናዘጋጃለን።', order: 2 },
        { q: 'What is your payment structure?', qAm: 'የክፍያ ሁኔታው እንዴት ነው?', a: 'We typically require a 30% deposit to secure your date, 40% midway through planning, and the final 30% one week before the event.', aAm: 'ቀኑን ለመያዝ 30%፣ በዝግጅት ሂደት ላይ 40%፣ እና ዝግጅቱ ከመጀመሩ ከአንድ ሳምንት በፊት ቀሪውን 30% ክፍያ እንቀበላለን።', order: 3 },
    ];

    for (const f of faqs) {
        await prisma.fAQ.create({ data: f });
    }
    console.log('FAQ seeded.');

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

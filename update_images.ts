import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import 'dotenv/config';

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Updating images to real photos...');

    // Update Events
    await prisma.event.updateMany({
        where: { title: 'Royal Ethiopian Wedding' },
        data: { image: '/images/events/photo_2026-01-29_22-06-04.jpg' }
    });

    await prisma.event.updateMany({
        where: { title: 'Tech Innovation Summit' },
        data: { image: '/images/events/photo_2026-01-29_22-05-56.jpg' }
    });

    await prisma.event.updateMany({
        where: { title: 'Meskel Celebration' },
        data: { image: '/images/events/photo_2026-01-29_22-06-09.jpg' }
    });

    await prisma.event.updateMany({
        where: { title: 'Summer Music Festival' },
        data: { image: '/images/events/photo_2026-01-29_22-06-30.jpg' }
    });

    console.log('Images updated successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

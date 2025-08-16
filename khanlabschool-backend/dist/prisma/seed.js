import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    const adminEmail = 'admin@example.com';
    const passwordHash = await bcrypt.hash('changeme123', 10);
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: { name: 'Admin', email: adminEmail, passwordHash, role: 'ADMIN' }
    });
    await prisma.page.upsert({
        where: { slug: 'home' },
        update: {},
        create: {
            slug: 'home',
            title: 'Khan Lab School',
            heroImage: '/hero.jpg',
            content: JSON.stringify({ blocks: [{ type: 'hero', title: 'Learner-Centered. Mastery-Based.', cta: 'Visit & Apply' }] }),
            visible: true
        }
    });
    await prisma.post.createMany({
        data: [
            { slug: 'welcome', title: 'Welcome to Our Community', content: 'Lorem ipsum', excerpt: 'Intro', published: true, publishedAt: new Date() },
            { slug: 'student-showcase', title: 'Student Showcase', content: 'Lorem ipsum', excerpt: 'Showcase', published: true, publishedAt: new Date() }
        ],
        skipDuplicates: true
    });
    await prisma.event.createMany({
        data: [
            { title: 'Open House', description: 'Tour our campus', startsAt: new Date(Date.now() + 7 * 864e5), endsAt: new Date(Date.now() + 7 * 864e5 + 2 * 3600e3), location: 'Main Campus', featured: true },
            { title: 'Info Session', description: 'Learn more', startsAt: new Date(Date.now() + 14 * 864e5), endsAt: new Date(Date.now() + 14 * 864e5 + 3600e3), location: 'Virtual', featured: false }
        ]
    });
    await prisma.staff.createMany({
        data: [
            { name: 'Dr. Jane Doe', role: 'Head of School', bio: 'Leader in mastery-based learning', headshot: '/jane.jpg', email: 'jane@example.com' },
            { name: 'John Smith', role: 'STEM Lead', bio: 'Project-based learning advocate', headshot: '/john.jpg', email: 'john@example.com' }
        ]
    });
    await prisma.program.createMany({
        data: [
            { slug: 'lower-school', name: 'Lower School', summary: 'Grades K-5', content: 'Lower school content', coverImage: '/lower.jpg' },
            { slug: 'upper-school', name: 'Upper School', summary: 'Grades 6-12', content: 'Upper school content', coverImage: '/upper.jpg' }
        ],
        skipDuplicates: true
    });
    console.log('Seeded');
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});

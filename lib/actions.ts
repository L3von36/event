"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

// Generic response type
export type ActionResponse = {
    success: boolean;
    message: string;
    data?: any;
};

// --- SERVICES ---

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function upsertService(data: any): Promise<ActionResponse> {
    try {
        const { id, ...rest } = data;
        if (id) {
            await prisma.service.update({ where: { id }, data: rest });
        } else {
            await prisma.service.create({ data: rest });
        }
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true, message: "Service saved successfully" };
    } catch (error) {
        return { success: false, message: "Failed to save service" };
    }
}

export async function deleteService(id: string): Promise<ActionResponse> {
    try {
        await prisma.service.delete({ where: { id } });
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true, message: "Service deleted" };
    } catch (error) {
        return { success: false, message: "Failed to delete service" };
    }
}

// --- EVENTS ---

export async function getEvents() {
    return await prisma.event.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function upsertEvent(data: any): Promise<ActionResponse> {
    try {
        const { id, ...rest } = data;
        if (id) {
            await prisma.event.update({ where: { id }, data: rest });
        } else {
            await prisma.event.create({ data: rest });
        }
        revalidatePath("/admin/events");
        revalidatePath("/");
        return { success: true, message: "Event saved successfully" };
    } catch (error) {
        return { success: false, message: "Failed to save event" };
    }
}

export async function deleteEvent(id: string): Promise<ActionResponse> {
    try {
        await prisma.event.delete({ where: { id } });
        revalidatePath("/admin/events");
        revalidatePath("/");
        return { success: true, message: "Event deleted" };
    } catch (error) {
        return { success: false, message: "Failed to delete event" };
    }
}

// --- FAQ ---

export async function getFAQs() {
    return await prisma.fAQ.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function upsertFAQ(data: any): Promise<ActionResponse> {
    try {
        const { id, ...rest } = data;
        if (id) {
            await prisma.fAQ.update({ where: { id }, data: rest });
        } else {
            await prisma.fAQ.create({ data: rest });
        }
        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true, message: "FAQ saved successfully" };
    } catch (error) {
        return { success: false, message: "Failed to save FAQ" };
    }
}

// --- GLOBAL SETTINGS ---

export async function getGlobalSettings() {
    let settings = await prisma.globalSettings.findUnique({
        where: { id: "singleton" }
    });

    if (!settings) {
        settings = await prisma.globalSettings.create({
            data: { id: "singleton", isYellowTheme: false }
        });
    }

    return settings;
}

export async function updateGlobalSettings(isYellowTheme: boolean): Promise<ActionResponse> {
    try {
        await prisma.globalSettings.upsert({
            where: { id: "singleton" },
            update: { isYellowTheme },
            create: { id: "singleton", isYellowTheme }
        });
        revalidatePath("/");
        revalidatePath("/admin/settings");
        return { success: true, message: "Settings updated successfully" };
    } catch (error) {
        return { success: false, message: "Failed to update settings" };
    }
}
// --- TESTIMONIALS ---

export async function getTestimonials() {
    return await prisma.testimonial.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function upsertTestimonial(data: any): Promise<ActionResponse> {
    try {
        const { id, ...rest } = data;
        if (id) {
            await prisma.testimonial.update({ where: { id }, data: rest });
        } else {
            await prisma.testimonial.create({ data: rest });
        }
        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true, message: "Testimonial saved successfully" };
    } catch (error) {
        return { success: false, message: "Failed to save testimonial" };
    }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
    try {
        await prisma.testimonial.delete({ where: { id } });
        revalidatePath("/admin/testimonials");
        revalidatePath("/");
        return { success: true, message: "Testimonial deleted" };
    } catch (error) {
        return { success: false, message: "Failed to delete testimonial" };
    }
}

// --- CONTACT REQUESTS ---

export async function submitContactRequest(data: {
    name: string;
    email: string;
    phone: string;
    eventType: string;
    message: string;
}): Promise<ActionResponse> {
    try {
        await prisma.contactRequest.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                eventType: data.eventType,
                message: data.message,
            }
        });
        return { success: true, message: "Thank you! We will contact you shortly." };
    } catch (error) {
        console.error("Contact submission error:", error);
        return { success: false, message: "Failed to send message. Please try again later." };
    }
}

export async function getLeads() {
    return await prisma.contactRequest.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getLead(id: string) {
    return await prisma.contactRequest.findUnique({
        where: { id }
    });
}

// --- SYSTEM FUNCTIONS ---

export async function exportDatabaseData(): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
        const [services, events, testimonials, faqs, settings, contactRequests] = await Promise.all([
            prisma.service.findMany({ orderBy: { order: 'asc' } }),
            prisma.event.findMany({ orderBy: { createdAt: 'desc' } }),
            prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
            prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
            prisma.globalSettings.findUnique({ where: { id: 'singleton' } }),
            prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } }),
        ]);

        return {
            success: true,
            data: {
                exportDate: new Date().toISOString(),
                version: "1.0.0",
                database: "SQLite/Prisma",
                brand: "Akirma",
                payload: {
                    services,
                    events,
                    testimonials,
                    faqs,
                    settings,
                    contactRequests
                }
            }
        };
    } catch (error) {
        console.error("Export error:", error);
        return { success: false, message: "Critical failure during data aggregation." };
    }
}

// --- SECURITY ---

export async function changePassword(formData: any): Promise<ActionResponse> {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return { success: false, message: "Unauthorized" };
        }

        const { currentPassword, newPassword } = formData;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return { success: false, message: "Current password is incorrect" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword }
        });

        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        console.error("Password change error:", error);
        return { success: false, message: "Failed to update password" };
    }
}

import { Container, Section } from "@/components/ui/common";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPageContent } from "@/lib/mdx";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Probhat Foundation. We are here to answer your questions and listen to your feedback.",
};

export default async function ContactPage() {
    const { meta } = await getPageContent("contact");

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-navy-deep py-20 text-center">
                <Container>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Contact Us</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        {meta.description}
                    </p>
                </Container>
            </div>

            <Section className="bg-white">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <h2 className="text-2xl font-bold text-navy-deep mb-6">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">
                                Have a question or want to get involved? Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            <ContactForm />
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-light-gray p-8 rounded-xl border border-gray-100 h-full">
                                <h3 className="text-xl font-bold text-navy-deep mb-6">Get in Touch</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-full border border-gray-200">
                                            <Mail className="h-5 w-5 text-sunrise-orange" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-navy-deep">Email</p>
                                            <a href={`mailto:${meta.email}`} className="text-gray-600 hover:text-sunrise-orange">{meta.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-full border border-gray-200">
                                            <Phone className="h-5 w-5 text-sunrise-orange" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-navy-deep">Phone</p>
                                            <a href={`tel:${meta.phone}`} className="text-gray-600 hover:text-sunrise-orange">{meta.phone}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-full border border-gray-200">
                                            <MapPin className="h-5 w-5 text-sunrise-orange" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-navy-deep">Service Area</p>
                                            <p className="text-gray-600">{meta.address || "Serving Rural Bangladesh"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 my-8"></div>

                                <h3 className="text-xl font-bold text-navy-deep mb-6">Follow Us</h3>
                                <div className="flex gap-4">
                                    {meta.socials?.facebook && (
                                        <Link href={meta.socials.facebook} className="bg-white p-3 rounded-full border border-gray-200 hover:border-sunrise-orange hover:text-sunrise-orange transition-colors">
                                            <Facebook className="h-5 w-5" />
                                        </Link>
                                    )}
                                    {meta.socials?.instagram && (
                                        <Link href={meta.socials.instagram} className="bg-white p-3 rounded-full border border-gray-200 hover:border-sunrise-orange hover:text-sunrise-orange transition-colors">
                                            <Instagram className="h-5 w-5" />
                                        </Link>
                                    )}
                                    {meta.socials?.linkedin && (
                                        <Link href={meta.socials.linkedin} className="bg-white p-3 rounded-full border border-gray-200 hover:border-sunrise-orange hover:text-sunrise-orange transition-colors">
                                            <Linkedin className="h-5 w-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
